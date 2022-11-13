using System.Collections.Generic;

namespace bielu.Umbraco.Cdn.Cloudflare.Models

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