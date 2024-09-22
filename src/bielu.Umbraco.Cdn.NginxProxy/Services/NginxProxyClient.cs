using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using bielu.Umbraco.Cdn.Models;
using bielu.Umbraco.Cdn.NginxProxy.Models;

namespace bielu.Umbraco.Cdn.NginxProxy.Services
{
    public class NginxProxyClient : INginxProxyClient
    {

        private static async Task<HttpResponseMessage> SendRequest(HttpMethod method, string url, object data)
        {
            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage(method, url);
                if (data != null)
                    request.Content = new StringContent(JsonSerializer.Serialize(data));
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var answer = await client.SendAsync(request);
                return answer;
            }
        }



        public async Task<IEnumerable<Zone>> GetZones(string? domainName = null)
        {
            throw new NotImplementedException("Not implemented yet");
        }

        public async Task<Status> PurgeCache(Zone zone, IEnumerable<string> urls, bool purgeEverything = false)
        {
            throw new NotImplementedException("Not implemented yet");
        }

        public async Task<Status> PurgeCache(Zone? zone,string? domains)
        {
            throw new NotImplementedException("Not implemented yet");
        }
    }
}
