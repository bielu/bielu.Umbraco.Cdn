using bielu.SchemaGenerator.Core.Attributes;
using bielu.Umbraco.Cdn.Azure.Common.Models;
using bielu.Umbraco.Cdn.Core.Configuration;

namespace bielu.Umbraco.Cdn.Azure.Common.Configuration;
[SchemaGeneration]
public class AzureBaseOptions : ConfigurationBaseOptions
{
    public AuthenticationType AuthenticationType { get; set; }
    
    public string ResourceGroupName { get; set; }
    
    public string SubscriptionId { get; set; }
    
    public string UserAssignedClientId { get; set; }
}