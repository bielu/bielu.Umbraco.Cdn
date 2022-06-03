using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace bielu.Umbraco.Cdn.Cloudflare.Services
{
    public class TokenApiClouflareAuthentication : IClouflareAuthentication
    {
        private readonly IConfiguration _configuration;

        public TokenApiClouflareAuthentication(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Dictionary<string, string> GetAuthenticationHeaders()
        {
            return new Dictionary<string, string>()
            {
                {
                    "Authorization",
                    $"Bearer {_configuration.GetSection("bielu")?.GetSection("cdn")?.GetSection("cloudflare")?.GetSection("token")?.Value}"
                }
            };
        }
    }
}