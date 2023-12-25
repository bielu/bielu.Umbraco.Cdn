using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Cloudflare.Configuration;
using bielu.Umbraco.Cdn.Models;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace bielu.Umbraco.Cdn.Cloudflare.Services
{
    public class CloudflareCdnService : ICdnService
    {
        private readonly ICloudflareClient _cloudflare;
        private readonly ILogger<CloudflareCdnService> _logger;
        private CloudflareOptions _options;

        public CloudflareCdnService(ICloudflareClient cloudflare, ILogger<CloudflareCdnService> logger, IOptionsMonitor<CloudflareOptions> optionsMonitor)
        {
            _cloudflare = cloudflare;
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
            var zones = (await _cloudflare.GetZones());
            var statuses = new List<Status>();
            foreach (var domain in zones)
            {
                var requestUrls = urls.Where(x =>
                    Uri.TryCreate(x, UriKind.Absolute, out var targetUri) && x.Contains(domain.Name));
                if(!requestUrls.Any()) continue;
                var request = await _cloudflare.PurgeCache(domain,
                    requestUrls);
                _logger.LogInformation("Cache refreshed, domains: {urls} for zone(id: {id}): {name}", string.Join(",",requestUrls),domain.Id,domain.Name);
                statuses.Add( request);
            }
            return statuses;
        }

        public async Task<IEnumerable<Status>> PurgeAll()
        {
            var zones = (await _cloudflare.GetZones());
            var statuses = new List<Status>();
            foreach (var domain in zones)
            {
            statuses.Add( await _cloudflare.PurgeCache(domain,null,true));
            }
            return statuses;
        }

        public async Task<IEnumerable<Status>> PurgeByAssignedHostnames(IEnumerable<string> domains)
        {
            var statuses = new List<Status>();
            foreach (var domain in domains)
            {
                var zone = (await _cloudflare.GetZones(domain)).FirstOrDefault();
                statuses.Add( await _cloudflare.PurgeCache(zone, domain));
            }

            return statuses;
        }

        public async Task<IList<string>> GetSupportedHostnames()
        {
            var zones = (await _cloudflare.GetZones());
            return zones.Select(x => x.Name).ToList();
        }
    }
}