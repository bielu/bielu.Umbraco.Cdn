namespace bielu.Umbraco.Cdn.Azure.Models;

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