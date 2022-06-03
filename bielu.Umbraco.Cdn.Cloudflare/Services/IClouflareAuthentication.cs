using System.Collections.Generic;

namespace bielu.Umbraco.Cdn.Cloudflare.Services
{
    public interface IClouflareAuthentication
    {
        public Dictionary<string, string> GetAuthenticationHeaders();
    }
}