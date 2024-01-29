using System.Text.Json.Serialization;
using bielu.SchemaGenerator.Core.Attributes;
using bielu.Umbraco.Cdn.Azure.Common.Configuration;
using bielu.Umbraco.Cdn.Core.Constants;

namespace bielu.Umbraco.Cdn.Azure.Cdn.Configuration;
[SchemaGeneration]
public class AzureCdnOptions : AzureBaseOptions
{
    [SchemaPrefix]
    [JsonIgnore]
    public static readonly string SectionName = $"{CdnConstants.CdnConfigSectionName}:Azure:Cdn";
    public string FrontDoorName { get; set; }
}
