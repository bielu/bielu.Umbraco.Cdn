namespace bielu.Umbraco.Cdn.Azure.Common.Models;

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
}