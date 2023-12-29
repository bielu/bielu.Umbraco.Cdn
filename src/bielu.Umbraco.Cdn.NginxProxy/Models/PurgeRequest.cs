using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bielu.Umbraco.Cdn.NginxProxy.Models
{
    public class PurgeRequest
    {
        [JsonPropertyName("purge_everything")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public bool PurgeEverything { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [JsonPropertyName("files")]
        public List<string>? Files { get; set; } = null;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [JsonPropertyName("hosts")]
        public List<string?>? Hosts { get; set; } = null;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [JsonPropertyName("tags")]
        public List<string>? Tags { get; set; } = null;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [JsonPropertyName("prefixes")]
        public List<string>? Prefixes { get; set; } = null;
    }
}