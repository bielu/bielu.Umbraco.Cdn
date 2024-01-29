
using bielu.SchemaGenerator.Core.Attributes;
using bielu.Umbraco.Cdn.Core.Configuration;
using bielu.Umbraco.Cdn.Core.Constants;
using Newtonsoft.Json;

namespace bielu.Umbraco.Cdn.Cloudflare.Configuration;
[SchemaGeneration]

public class CloudflareOptions : ConfigurationBaseOptions
{
    [SchemaPrefix]
    [JsonIgnore]
    public static readonly string SectionName = $"{CdnConstants.CdnConfigSectionName}:Cloudflare";

    public bool Enterprise { get; set; }
    public string Token { get; set; }
    public string ApiKey { get; set; }
    public string Email { get; set; }
    public AuthenticationType AuthenticationType { get; set; } = AuthenticationType.GlobalApiKey;

}
