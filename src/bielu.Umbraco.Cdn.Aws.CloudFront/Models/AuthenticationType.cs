namespace bielu.Umbraco.Cdn.Aws.Models;

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