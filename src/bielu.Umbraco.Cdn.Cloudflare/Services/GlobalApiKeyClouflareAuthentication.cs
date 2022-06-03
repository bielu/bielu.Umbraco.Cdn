using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace bielu.Umbraco.Cdn.Cloudflare.Services
{
    public class GlobalApiKeyClouflareAuthentication: IClouflareAuthentication
    {
        private readonly IConfiguration _configuration;

        public GlobalApiKeyClouflareAuthentication(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Dictionary<string, string> GetAuthenticationHeaders()
        {
            return new Dictionary<string, string>()
            {
                {
                    "X-Auth-Key",
                    $"{_configuration.GetSection("bielu")?.GetSection("cdn")?.GetSection("cloudflare")?.GetSection("apiKey")?.Value}"
                }, {
                    "X-Auth-Email",
                    $"{_configuration.GetSection("bielu")?.GetSection("cdn")?.GetSection("cloudflare")?.GetSection("email")?.Value}"
                }
            };
        }
    }
}