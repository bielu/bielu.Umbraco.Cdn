using Azure;
using Azure.ResourceManager.Cdn;
using Azure.ResourceManager.Cdn.Models;
using bielu.Umbraco.Cdn.Azure.Cdn.Configuration;
using bielu.Umbraco.Cdn.Models;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Events;

namespace bielu.Umbraco.Cdn.Azure.Cdn.Services
{
    public class AzureCdnService : ICdnService
    {
        private readonly ProfileResource _client;
        private readonly ILogger<AzureCdnService> _logger;
        private AzureCdnOptions _options;

        public AzureCdnService(IAzureCdnClientFactory cdnClientFactory, ILogger<AzureCdnService> logger, IOptionsMonitor<AzureCdnOptions> optionsMonitor)
        {
            _client = cdnClientFactory.GetCdnClient();
            _logger = logger;
            _options = optionsMonitor.CurrentValue;
            optionsMonitor.OnChange((options, s) =>
            {
                _options = options;
            });
        }

        public async Task<IEnumerable<Status>> PurgePages(IEnumerable<string> urls)
        {
            var endpoints = await GetEndpoints();
            var statuses = new List<Status>();
            foreach (var endpoint in endpoints)
            {
                var requestUrls = urls
                    .Where(x => Uri.TryCreate(x, UriKind.Absolute, out var targetUri) &&
                                targetUri.Host.Equals(endpoint.Data.HostName, StringComparison.OrdinalIgnoreCase))
                    .Select(x => new Uri(x, UriKind.Absolute).AbsolutePath)
                    .Distinct();
                if(!requestUrls.Any()) continue;
                var request =
                    await endpoint.PurgeContentAsync(WaitUntil.Started, new FrontDoorPurgeContent(requestUrls));
                _logger.LogInformation("Cache refreshed, domains: {Urls} for endpoint(id: {Id}): {Name}",
                    string.Join(",", requestUrls), endpoint.Id, endpoint.Data.Name);
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
        public bool IsEnabled()
        {
            return !_options.Disabled;
        }
        public async Task<IEnumerable<Status>> PurgeAll()
        {
            var endpoints = await GetEndpoints();
            var statuses = new List<Status>();
            foreach (var endpoint in endpoints)
            {
                var request = await endpoint.PurgeContentAsync(WaitUntil.Started,
                    new FrontDoorPurgeContent(new List<string>() { "/*" }));
                _logger.LogInformation("Cache refreshed, domains for zone(id: {Id}): {Name}", endpoint.Id, endpoint.Data.Name);
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

        public async Task<IEnumerable<Status>> PurgeByAssignedHostnames(IEnumerable<string?> domains)
        {
            return await PurgeAll();
        }

        public async Task<IList<string>> GetSupportedHostnames()
        {
            var endpoints = await GetEndpoints();
            return endpoints.Select(x => x.Data.HostName).ToList();
        }

        private async Task<List<FrontDoorEndpointResource>> GetEndpoints()
        {
            return await _client
                .GetFrontDoorEndpoints()
                .GetAllAsync()
                .ToListAsync();
        }
    }
}
