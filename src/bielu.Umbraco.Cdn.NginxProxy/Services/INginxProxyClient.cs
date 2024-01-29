using System.Collections.Generic;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Models;
using bielu.Umbraco.Cdn.NginxProxy.Models;

namespace bielu.Umbraco.Cdn.NginxProxy.Services
{
    public interface INginxProxyClient
    {
        public Task<IEnumerable<Zone>> GetZones(string? domainName = null);

        public Task<Status> PurgeCache(Zone zone, IEnumerable<string?> urls, bool purgeEverything = false);
        
        public Task<Status> PurgeCache(Zone? zone, string? domains);
    }
}