using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bielu.Umbraco.Cdn.Cloudflare.Models
{
    public class PurgeRequest
    {
        [JsonPropertyName("purge_everything")] public bool PurgeEverything { get; set; }
        [JsonPropertyName("files")] public List<string> Files { get; set; } = new();
        [JsonPropertyName("hosts")] public List<string> Hosts { get; set; } = new();
        [JsonPropertyName("hosts")] public List<string> Tags { get; set; } = new();
        [JsonPropertyName("hosts")] public List<string> Prefixes { get; set; } = new();
    }
}