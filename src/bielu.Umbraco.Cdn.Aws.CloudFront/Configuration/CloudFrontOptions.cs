using Amazon;
using bielu.SchemaGenerator.Core.Attributes;
using bielu.Umbraco.Cdn.Core.Configuration;
using bielu.Umbraco.Cdn.Core.Constants;
using Newtonsoft.Json;

namespace bielu.Umbraco.Cdn.Aws.Configuration;

public class CloudFrontOptions : ConfigurationBaseOptions
{
    [SchemaPrefix] [JsonIgnore]
    public static string SectionName = $"{CdnConstants.CdnConfigSectionName}:AWS:CloudFront";

    [JsonIgnore]
    public RegionEndpoint Region
    {
        get { return RegionEndpoint.GetBySystemName(RegionName); }
    }

    public string RegionName { get; set; } = "eu-west-1";

    public string SecretKey { get; set; }
    public string AccessKey { get; set; }
}