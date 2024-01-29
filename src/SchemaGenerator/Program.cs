using System.Reflection;
using bielu.SchemaGenerator.Build.Configuration;
using bielu.SchemaGenerator.Build.Services;
using bielu.Umbraco.Cdn.Akamai.Configuration;
using bielu.Umbraco.Cdn.Aws.Configuration;
using bielu.Umbraco.Cdn.Azure.Cdn.Configuration;
using bielu.Umbraco.Cdn.Azure.Common.Configuration;
using bielu.Umbraco.Cdn.Azure.Configuration;
using bielu.Umbraco.Cdn.Cloudflare.Configuration;
using bielu.Umbraco.Cdn.Core.Configuration;
using CommandLine;

namespace SchemageGerator;

internal class Program
{
    static readonly IList<Assembly> _assemblies = new List<Assembly>()
    {
        typeof(CloudFrontOptions).Assembly,
        typeof(CloudflareOptions).Assembly,
        typeof(FrontDoorOptions).Assembly,
        typeof(AzureBaseOptions).Assembly,
        typeof(AzureCdnOptions).Assembly,
        typeof(BieluCdnOptions).Assembly,
        typeof(AkamaiOptions).Assembly,
        typeof(BunnyNetOptions).Assembly,
    };

    public static async Task Main(string[] args)
    {
        try
        {
            await Parser.Default.ParseArguments<Options>(args)
                .WithParsedAsync(x=>Execute(x));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    private static async Task Execute(Options options)
    {
        Console.WriteLine("Schema generator v {0}", typeof(SchemaGeneratorService).Assembly.GetName().Version?.ToString());


        var schemaGenerator = new SchemaGeneratorService(new SchemaGenerator(), options);
        schemaGenerator.GenerateSchema(_assemblies);

        Console.WriteLine("Schema generator v {0}", typeof(SchemaGeneratorService).Assembly.GetName().Version?.ToString());

    }
}
