using System.Text.Json.Serialization;
using bielu.SchemaGenerator.Core.Attributes;
using bielu.Umbraco.Cdn.Core.Configuration;
using bielu.Umbraco.Cdn.Core.Constants;

namespace bielu.Umbraco.Cdn.Azure.Models;
[SchemaGeneration]
public class FrontDoorOptions : ConfigurationBaseOptions
{
    [SchemaPrefix]
    [JsonIgnore]
    public static string SectionName = $"{CdnConstants.CdnConfigSectionName}::Azure:FrontDoor";
    public AuthenticationType AuthenticationType { get; set; }
    public string FrontDoorName { get; set; }
    public string ResourceGroupName { get; set; }
    public string SubscriptionId { get; set; }
}