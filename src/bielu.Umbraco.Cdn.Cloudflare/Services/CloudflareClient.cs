using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using bielu.Umbraco.Cdn.Cloudflare.Models;
using bielu.Umbraco.Cdn.Models;

namespace bielu.Umbraco.Cdn.Cloudflare.Services
{
    public class CloudflareClient : ICloudflareClient
    {
        public const string CLOUDFLARE_API_BASE_URL = "https://api.cloudflare.com/client/v4/";
        private readonly IClouflareAuthentication _authentication;

        public CloudflareClient(IClouflareAuthentication authentication)
        {
            _authentication = authentication;
        }

        private async Task<HttpResponseMessage> SendRequest(string url, object data)
        {
            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Post,url);
                request.Content = new StringContent(JsonSerializer.Serialize(data));
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                AddAuthenticationHeaders(request);
               var answer = client.Send(request);
               return answer;
            }
        }

        private void AddAuthenticationHeaders(HttpRequestMessage request)
        {
            var headers = _authentication.GetAuthenticationHeaders();
            foreach (var header in headers)
            {
                request.Headers.Add(header.Key,header.Value);
            }
        }

        public async Task<IEnumerable<Zone>> GetZones(string domainName = null)
        {
        
            string url = CLOUDFLARE_API_BASE_URL + "zones";
            var uri = new Uri(url);
            var uriBuilder = new UriBuilder(url);
            var query = HttpUtility.ParseQueryString(uriBuilder.Query);
            if(!string.IsNullOrWhiteSpace(domainName)){
                query["name"] = domainName;
            }
            uriBuilder.Query = query.ToString();
            url = uriBuilder.ToString();
            var result = (await SendRequest(url, null));
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
            //todo: add more details
           return new Status()
           {
               Success = (await SendRequest(url, new PurgeRequest()
               {
                   Files = urls.ToList(),
                   PurgeEverything = purgeEverything
               })).IsSuccessStatusCode
           } ;
        }

        public async Task<Status> PurgeCache(Zone zone, IEnumerable<string> domains)
        {
            var url = CLOUDFLARE_API_BASE_URL + "zones/" + zone.Id + "/purge_cache";
            var result = await SendRequest(url, new PurgeRequest()
            {
                Hosts = domains.ToList()
            });
            //todo: add more details
            return new Status()
            {
                Success = result.IsSuccessStatusCode
            };
        }
    }
}