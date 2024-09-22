using System.Text.Json.Serialization;
using bielu.SchemaGenerator.Core.Attributes;
using bielu.Umbraco.Cdn.Azure.Common.Configuration;
using bielu.Umbraco.Cdn.Core.Constants;

namespace bielu.Umbraco.Cdn.Azure.Configuration;
[SchemaGeneration]
public class FrontDoorOptions : AzureBaseOptions
{
    [SchemaPrefix]
    [JsonIgnore]
    public static readonly string SectionName = $"{CdnConstants.CdnConfigSectionName}:Azure:FrontDoor";
    public string FrontDoorName { get; set; }
}
