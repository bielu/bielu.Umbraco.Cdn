using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using Amazon.CloudFront;
using Amazon.CloudFront.Model;
using bielu.Umbraco.Cdn.Aws.Models;
using bielu.Umbraco.Cdn.Models;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Events;

namespace bielu.Umbraco.Cdn.Aws.Services;

public class CloudFrontCdnService : ICdnService
{
    private readonly AmazonCloudFrontClient _client;
    private readonly ILogger<CloudFrontCdnService> _logger;
    private  CloudFrontOptions _options;

    public CloudFrontCdnService(IAmazonCloudFrontClientFactory cloudflare, ILogger<CloudFrontCdnService> logger, IOptionsMonitor<CloudFrontOptions> optionsMonitor)
    {
        _client = cloudflare.GetCloudFrontClient();
        _logger = logger;
        _options = optionsMonitor.CurrentValue;
        optionsMonitor.OnChange((options, s) =>
        {
            _options = options;
        });
    }

    public bool IsEnabled()
    {
        return !_options.Disabled;
    }

    public async Task<IEnumerable<Status>> PurgePages(IEnumerable<string> urls)
    {
        var zones = (await _client.ListDistributionsAsync()).DistributionList.Items.Select(x => new Zone()
        {
            Id = x.Id,
            Name = x.DomainName
        }).Distinct();
        var statuses = new List<Status>();
        foreach (var domain in zones)
        {
            try
            {
                CreateInvalidationRequest oRequest = new CreateInvalidationRequest();
                oRequest.DistributionId = domain.Id;
                oRequest.InvalidationBatch = new InvalidationBatch
                {
                    CallerReference = DateTime.Now.Ticks.ToString(),
                    Paths = new Paths
                    {
                        Items = urls.ToList<string>(),
                        Quantity = urls.Count()
                    }
                };

                CreateInvalidationResponse oResponse = await _client.CreateInvalidationAsync(oRequest);
                var isError = oResponse.HttpStatusCode == System.Net.HttpStatusCode.OK;
                var status = oResponse.ResponseMetadata;

                statuses.Add(new Status()
                {
                    Success = isError,
                    /* todo: figure out how to get errors
                     Errors = status..Select(x => new Errors()
                    {
                        Code = x.Code,
                        Message = x.Message
                    }).ToList(),*/
                    MessageType = isError ? EventMessageType.Error : EventMessageType.Success
                });
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error purging cache for zone(id: {id}): {name}", domain.Id, domain.Name);
                statuses.Add(new Status()
                {
                    Success = false,

                    Errors = new List<Errors>()
                    {
                        new Errors()
                        {
                            Code = e.HResult,
                            Message = e.Message
                        }
                    },
                    MessageType = EventMessageType.Error
                });
            }
        }

        return statuses;
    }

    public async Task<IEnumerable<Status>> PurgeAll()
    {
        var zones = (await _client.ListDistributionsAsync()).DistributionList.Items.Select(x => new Zone()
        {
            Id = x.Id,
            Name = x.DomainName
        }).Distinct();
        var statuses = new List<Status>();
        foreach (var domain in zones)
        {
            var oResponse = await _client.CreateInvalidationAsync(new CreateInvalidationRequest
            {
                DistributionId = domain.Id,
                InvalidationBatch = new InvalidationBatch
                {
                    Paths = new Paths
                    {
                        Items = new List<string> { "/*" },
                        Quantity = 1
                    },
                    CallerReference = DateTime.Now.Ticks.ToString()
                }
            });
            _logger.LogInformation("Cache refreshed, domains for zone(id: {id}): {name}", domain.Id, domain.Name);
            var isError = oResponse.HttpStatusCode == System.Net.HttpStatusCode.OK;
            var status = oResponse.ResponseMetadata;

            statuses.Add(new Status()
            {
                Success = !isError,
                /* todo: figure out how to get errors
                 Errors = status..Select(x => new Errors()
                {
                    Code = x.Code,
                    Message = x.Message
                }).ToList(),*/
                MessageType = isError ? EventMessageType.Error : EventMessageType.Success
            });
        }

        return statuses;
    }

    public async Task<IEnumerable<Status>> PurgeByAssignedHostnames(IEnumerable<string> domains)
    {
        return await PurgeAll();
    }

    public async Task<IList<string>> GetSupportedHostnames()
    {
        return (await _client.ListDistributionsAsync()).DistributionList.Items.Select(x => x.DomainName).Distinct()
            .ToList();
    }
}