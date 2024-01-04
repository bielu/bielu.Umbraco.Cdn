using System.Text.Json.Serialization;

namespace bielu.Umbraco.Cdn.Azure.Models
{
    public class Zone
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }
}