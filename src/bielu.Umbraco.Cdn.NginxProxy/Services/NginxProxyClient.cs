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
using Microsoft.Extensions.Configuration;

namespace bielu.Umbraco.Cdn.NginxProxy.Services
{
    public class NginxProxyClient : INginxProxyClient
    {
        public const string CLOUDFLARE_API_BASE_URL = "https://api.cloudflare.com/client/v4/";
        private readonly IConfiguration _configuration;
        private readonly bool _isEnterprise;

        public NginxProxyClient()
        {
        }

        private async Task<HttpResponseMessage> SendRequest(HttpMethod method, string url, object data)
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

     

        public async Task<IEnumerable<Zone>> GetZones(string domainName = null)
        {
            string url = CLOUDFLARE_API_BASE_URL + "zones";
            var uri = new Uri(url);
            var uriBuilder = new UriBuilder(url);
            var query = HttpUtility.ParseQueryString(uriBuilder.Query);
            if (!string.IsNullOrWhiteSpace(domainName))
            {
                query["name"] = domainName;
            }

            uriBuilder.Query = query.ToString();
            url = uriBuilder.ToString();
            var result = (await SendRequest(HttpMethod.Get, url, null));
            if (result.IsSuccessStatusCode)
            {
                var response = await result.Content.ReadFromJsonAsync<CloudflareResponse>();
                return response.Result;
            }

            return new List<Zone>();
        }

        public async Task<Status> PurgeCache(Zone zone, IEnumerable<string> urls, bool purgeEverything = false)
        {
            var url = CLOUDFLARE_API_BASE_URL + "zones/" + zone.Id + "/purge_cache";
            var result = (await SendRequest(HttpMethod.Post, url, new PurgeRequest()
            {
                Files = urls.ToList(),
                PurgeEverything = purgeEverything
            }));
            //todo: add more details
            return new Status()
            {
                Success = result.IsSuccessStatusCode,
                Message = result.IsSuccessStatusCode? "Cloudflare purged" : "Something went wrong, ask administrator to check logs."
            };
        }

        public async Task<Status> PurgeCache(Zone zone,string domains)
        {
            if (zone == null || domains == null || string.IsNullOrWhiteSpace(domains))
            {
                return new Status()
                {
                    Success = false,
                    Message = "zone not available"
                };
            }

            var url = CLOUDFLARE_API_BASE_URL + "zones/" + zone.Id + "/purge_cache";
            
            var result = await SendRequest(HttpMethod.Post, url, new PurgeRequest()
            {
                Hosts = _isEnterprise ? new List<string>()  {domains  } : null,
                PurgeEverything = !_isEnterprise
            });
            //todo: add more details
            return new Status()
            {
                Success = result.IsSuccessStatusCode,
                
            };
        }
    }
}