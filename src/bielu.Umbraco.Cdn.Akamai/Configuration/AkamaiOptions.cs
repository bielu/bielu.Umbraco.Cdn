using bielu.SchemaGenerator.Core.Attributes;
using bielu.Umbraco.Cdn.Core.Configuration;
using bielu.Umbraco.Cdn.Core.Constants;
using Newtonsoft.Json;

namespace bielu.Umbraco.Cdn.Akamai.Configuration;
[SchemaGeneration]

public class AkamaiOptions : ConfigurationBaseOptions
{
    [SchemaPrefix]
    [JsonIgnore]
    public static string SectionName = $"{CdnConstants.CdnConfigSectionName}:Cloudflare";


    public string BaseUrl { get; set; } ="https://api.ccu.akamai.com/ccu/v3";
}