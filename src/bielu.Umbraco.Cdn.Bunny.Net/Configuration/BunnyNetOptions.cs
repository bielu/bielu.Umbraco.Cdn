using bielu.SchemaGenerator.Core.Attributes;
using bielu.Umbraco.Cdn.Core.Configuration;
using bielu.Umbraco.Cdn.Core.Constants;
using Newtonsoft.Json;

namespace bielu.Umbraco.Cdn.Akamai.Configuration;
[SchemaGeneration]
public class BunnyNetOptions : ConfigurationBaseOptions
{
    [SchemaPrefix]
    [JsonIgnore]
    public static readonly string SectionName = $"{CdnConstants.CdnConfigSectionName}:Bunny:Net";
    public string SwitchKey { get; set; }
    public string? AccessKey { get; set; }
}
