using System.Collections.Generic;
using bielu.Umbraco.Cdn.Cloudflare.Models;

namespace bielu.Umbraco.Cdn.Azure.Models

{
    public class CloudflareResponse
    {
        public Dictionary<string,string> Result { get; set; }
        public bool Success{ get; set; }
        public List<Errors>  Errors{ get; set; }
    }
    public class CloudflareZoneResponse
    {
        public List<Zone> Result { get; set; }
        public bool Success{ get; set; }
        public List<Errors>  Errors{ get; set; }
    }
}