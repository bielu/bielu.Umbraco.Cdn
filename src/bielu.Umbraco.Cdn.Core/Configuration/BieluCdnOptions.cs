
using bielu.SchemaGenerator.Core.Attributes;
using bielu.Umbraco.Cdn.Core.Constants;
using Newtonsoft.Json;

namespace bielu.Umbraco.Cdn.Core.Configuration;
[SchemaGeneration]
public class BieluCdnOptions
{
    public bool DevMode { get; set; }
    public bool Auditing { get; set; } = true;
    public bool Preview { get; set; }
    [SchemaPrefix]
    [JsonIgnore]
    public static string SectionName { get; set; } = $"{CdnConstants.CdnConfigSectionName}";

    public bool ReferencePurge { get; set; }
}
