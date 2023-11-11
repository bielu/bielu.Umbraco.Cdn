using Amazon;

namespace bielu.Umbraco.Cdn.Aws.Models;

public class CloudFrontOptions
{
    public static string SectionName = "bielu:cdn:AWS:CloudFront";
    public RegionEndpoint Region { get; set; }
    public string SecretKey { get; set; }
    public string AccessKey { get; set; }
}

public enum AuthenticationType
{
    ManagedIdentityCredential,
    DefaultAzureCredential,
    InteractiveBrowserCredential,
    SharedTokenCacheCredential,
    VisualStudioCredential,
    VisualStudioCodeCredential,
    AzureCliCredential,
    AzurePowerShellCredential,
    EnvironmentCredential,
    ManagedIdentityCredentialWithClientId,
}