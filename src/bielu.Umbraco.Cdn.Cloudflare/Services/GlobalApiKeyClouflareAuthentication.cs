using System.Collections.Generic;
using bielu.Umbraco.Cdn.Cloudflare.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace bielu.Umbraco.Cdn.Cloudflare.Services
{
    public class GlobalApiKeyClouflareAuthentication: IClouflareAuthentication
    {
        private  CloudflareOptions _configuration;

        public GlobalApiKeyClouflareAuthentication(IOptionsMonitor<CloudflareOptions> optionsMonitor)
        {
            _configuration = optionsMonitor.CurrentValue;
            optionsMonitor.OnChange((options, s) =>
            {
                _configuration = options;
            });
        }

        public Dictionary<string, string> GetAuthenticationHeaders()
        {
            return new Dictionary<string, string>()
            {
                {
                    "X-Auth-Key",
                    $"{_configuration.ApiKey}"
                }, {
                    "X-Auth-Email",
                    $"{_configuration.Email}"
                }
            };
        }
    }
}