using bielu.SchemaGenerator.Core.Attributes;
using bielu.Umbraco.Cdn.Akamai.FastPurge.Interface;
using bielu.Umbraco.Cdn.Core.Configuration;
using bielu.Umbraco.Cdn.Core.Constants;
using Newtonsoft.Json;

namespace bielu.Umbraco.Cdn.Akamai.Configuration;
[SchemaGeneration]

public class AkamaiOptions : ConfigurationBaseOptions
{
    [SchemaPrefix]
    [JsonIgnore]
    public static readonly string SectionName = $"{CdnConstants.CdnConfigSectionName}:Akamai";
    public string BaseUrl { get; set; } ="https://api.ccu.akamai.com/ccu/v3";
    public Network6 Network { get; set; } = Network6.Production;
    public List<string> SupportedHosts { get; set; } = new List<string>();
    public string SwitchKey { get; set; }
}
