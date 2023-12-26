using bielu.SchemaGenerator.Core.Attributes;

namespace bielu.Umbraco.Cdn.Core.Configuration;
[SchemaGeneration]
public class ConfigurationBaseOptions
{
    public bool Disabled { get; set; } = false;
    
}