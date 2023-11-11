namespace bielu.Umbraco.Cdn.Azure.Models;

public class FrontDoorOptions
{
    public static string SectionName = "bielu:cdn:FrontDoor";
    public AuthenticationType AuthenticationType { get; set; }
    public string FrontDoorName { get; set; }
    public string ResourceGroupName { get; set; }
    public string SubscriptionId { get; set; }
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