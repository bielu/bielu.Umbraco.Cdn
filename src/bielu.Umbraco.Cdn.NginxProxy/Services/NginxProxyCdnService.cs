using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Models;

namespace bielu.Umbraco.Cdn.Cloudflare.Services
{
    public class CloudflareCdnService : ICdnService
    {
        private readonly ICloudflareClient _cloudflare;

        public CloudflareCdnService(ICloudflareClient cloudflare)
        {
            _cloudflare = cloudflare;
        }

        public async Task<IEnumerable<Status>> PurgePages(IEnumerable<string> urls)
        {
            var zones = (await _cloudflare.GetZones());
            var statuses = new List<Status>();
            foreach (var domain in zones)
            {
                statuses.Add( await _cloudflare.PurgeCache(domain,urls.Where(x=>urls.Contains(new Uri(x).Host))));
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
    }
}