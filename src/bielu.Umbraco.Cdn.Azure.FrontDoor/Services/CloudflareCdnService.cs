using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure;
using Azure.ResourceManager.FrontDoor;
using Azure.ResourceManager.FrontDoor.Models;
using bielu.Umbraco.Cdn.Azure.Models;
using bielu.Umbraco.Cdn.Cloudflare.Models;
using bielu.Umbraco.Cdn.Models;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;

namespace bielu.Umbraco.Cdn.Azure.Services
{
    public class CloudflareCdnService : ICdnService
    {
        private readonly FrontDoorResource _client;
        private readonly ILogger<CloudflareCdnService> _logger;

        public CloudflareCdnService(IFrontDoorClientFactory cloudflare, ILogger<CloudflareCdnService> logger)
        {
            _client = cloudflare.GetFrontDoorClient();
            _logger = logger;
        }

        public async Task<IEnumerable<Status>> PurgePages(IEnumerable<string> urls)
        {
            var zones = _client.Data.FrontendEndpoints.Select(x => new Zone()
            {
                Id = x.Id.Name,
                Name = x.HostName
            }).Distinct();
            var statuses = new List<Status>();
            foreach (var domain in zones)
            {
                var requestUrls = urls.Where(x =>
                    Uri.TryCreate(x, UriKind.Absolute, out var targetUri) && x.Contains(domain.Name));
                if(!requestUrls.Any()) continue;
                var request =
                    await _client.PurgeContentAsync(WaitUntil.Started, new FrontDoorEndpointPurgeContent(requestUrls));
                _logger.LogInformation("Cache refreshed, domains: {urls} for zone(id: {id}): {name}",
                    string.Join(",", requestUrls), domain.Id, domain.Name);
                var status = await request.UpdateStatusAsync();
                statuses.Add(new Status()
                {
                    Success = !status.IsError,
                    /* todo: figure out how to get errors
                     Errors = status..Select(x => new Errors()
                    {
                        Code = x.Code,
                        Message = x.Message
                    }).ToList(),*/
                    MessageType = status.IsError ? EventMessageType.Error : EventMessageType.Success
                });
            }

            return statuses;
        }

        public async Task<IEnumerable<Status>> PurgeAll()
        {
            var zones = _client.Data.FrontendEndpoints.Select(x => new Zone()
            {
                Id = x.Id.Name,
                Name = x.HostName
            }).Distinct();
            var statuses = new List<Status>();
            foreach (var domain in zones)
            {

                var request = await _client.PurgeContentAsync(WaitUntil.Started,
                    new FrontDoorEndpointPurgeContent(new List<string>() { "/*" }));
                _logger.LogInformation("Cache refreshed, domains for zone(id: {id}): {name}", domain.Id, domain.Name);
                var status = await request.UpdateStatusAsync();
                statuses.Add(new Status()
                {
                    Success = !status.IsError,
                    /* todo: figure out how to get errors
                     Errors = status..Select(x => new Errors()
                    {
                        Code = x.Code,
                        Message = x.Message
                    }).ToList(),*/
                    MessageType = status.IsError ? EventMessageType.Error : EventMessageType.Success
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
        return _client.Data.FrontendEndpoints.Select(x => x.HostName).ToList();
    }

    private async Task<IEnumerable<Status>> PurgeAll(params string[] paths)
    {
        var zones = _client.Data.FrontendEndpoints.Select(x => new Zone()
        {
            Id = x.Id.Name,
            Name = x.HostName
        }).Distinct();
        var statuses = new List<Status>();
        foreach (var domain in zones)
        {

            var request = await _client.PurgeContentAsync(WaitUntil.Started,
                new FrontDoorEndpointPurgeContent(new List<string>() { "/*" }));
            _logger.LogInformation("Cache refreshed, domains for zone(id: {id}): {name}", domain.Id, domain.Name);
            var status = await request.UpdateStatusAsync();
            statuses.Add(new Status()
            {
                Success = !status.IsError,
                /* todo: figure out how to get errors
                 Errors = status..Select(x => new Errors()
                {
                    Code = x.Code,
                    Message = x.Message
                }).ToList(),*/
                MessageType = status.IsError ? EventMessageType.Error : EventMessageType.Success
            });
        }

        return statuses;
    }
    }
}