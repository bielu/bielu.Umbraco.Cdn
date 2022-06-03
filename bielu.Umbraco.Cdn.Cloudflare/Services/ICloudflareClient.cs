using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Cloudflare.Models;
using bielu.Umbraco.Cdn.Models;

namespace bielu.Umbraco.Cdn.Cloudflare.Services
{
    public interface ICloudflareClient
    {
        public Task<IEnumerable<Zone>> GetZones(string domainName = null);

        public Task<Status> PurgeCache(Zone zone, IEnumerable<string> urls, bool purgeEverything = false);
        
        public Task<Status> PurgeCache(Zone zone, IEnumerable<string> domains);
    }
}