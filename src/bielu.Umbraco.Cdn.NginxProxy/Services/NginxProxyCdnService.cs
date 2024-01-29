using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Models;
using bielu.Umbraco.Cdn.Services;

namespace bielu.Umbraco.Cdn.NginxProxy.Services
{
    public class NginxProxyCdnService : ICdnService
    {
        private readonly INginxProxyClient _nginxProxy;

        public NginxProxyCdnService(INginxProxyClient nginxProxy)
        {
            _nginxProxy = nginxProxy;
        }

        public bool IsEnabled()
        {
            return true;
        }

        public async Task<IEnumerable<Status>> PurgePages(IEnumerable<string?> urls)
        {
            var zones = (await _nginxProxy.GetZones());
            var statuses = new List<Status>();
            foreach (var domain in zones)
            {
                statuses.Add( await _nginxProxy.PurgeCache(domain,urls.Where(x=>urls.Contains(new Uri(x).Host))));
            }
            return statuses;
        }

        public async Task<IEnumerable<Status>> PurgeAll()
        {
            var zones = (await _nginxProxy.GetZones());
            var statuses = new List<Status>();
            foreach (var domain in zones)
            {
            statuses.Add( await _nginxProxy.PurgeCache(domain,null,true));
            }
            return statuses;
        }

        public async Task<IEnumerable<Status>> PurgeByAssignedHostnames(IEnumerable<string?> domains)
        {
            var statuses = new List<Status>();
            foreach (var domain in domains)
            {
                var zone = (await _nginxProxy.GetZones(domain)).FirstOrDefault();
                statuses.Add( await _nginxProxy.PurgeCache(zone, domain));
            }

            return statuses;
        }

        public Task<IList<string>> GetSupportedHostnames()
        {
            return Task.FromResult<IList<string>>(new List<string>());
        }
    }
}