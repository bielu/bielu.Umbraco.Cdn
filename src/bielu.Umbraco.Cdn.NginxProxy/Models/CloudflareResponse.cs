using System.Collections.Generic;

namespace bielu.Umbraco.Cdn.NginxProxy.Models
{
    public class CloudflareResponse
    {
        public List<Zone> Result { get; set; }
    }
}