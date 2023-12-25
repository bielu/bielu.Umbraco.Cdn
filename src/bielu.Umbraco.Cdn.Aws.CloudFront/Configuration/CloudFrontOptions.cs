using Amazon;
using bielu.SchemaGenerator.Core.Attributes;
using bielu.Umbraco.Cdn.Core.Constants;
using Newtonsoft.Json;

namespace bielu.Umbraco.Cdn.Aws.Models;
[SchemaGeneration]
public class CloudFrontOptions
{
    [SchemaPrefix]
    [JsonIgnore]
    public static string SectionName = $"{CdnConstants.CdnConfigSectionName}:AWS:CloudFront";
    public RegionEndpoint Region { get; set; }
    public string SecretKey { get; set; }
    public string AccessKey { get; set; }
}