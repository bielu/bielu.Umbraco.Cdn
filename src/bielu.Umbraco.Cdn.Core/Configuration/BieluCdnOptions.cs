namespace bielu.Umbraco.Cdn.Core.Configuration;

public class BieluCdnOptions
{
    public bool DevMode { get; set; }
    public static string SectionName { get; set; } = "Bielu:Cdn";
}