﻿using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace bielu.Umbraco.Cdn.Cloudflare.Models
{
    public class Zone
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("development_mode")]
        public bool DevelopmentMode { get; set; }

        [JsonPropertyName("name_servers")]
        public List<string> NameServers { get; set; }
    }
}