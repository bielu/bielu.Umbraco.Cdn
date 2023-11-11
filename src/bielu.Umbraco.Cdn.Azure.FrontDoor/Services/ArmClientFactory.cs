using System;
using Azure.Core;
using Azure.Identity;
using Azure.ResourceManager;
using bielu.Umbraco.Cdn.Azure.Models;
using Microsoft.Extensions.Options;

namespace bielu.Umbraco.Cdn.Azure.Services;

public class ArmClientFactory : IArmClientFactory
{
    private readonly IOptions<FrontDoorOptions> _options;

    public ArmClientFactory(IOptions<FrontDoorOptions> options)
    {
        _options = options;
    }

    public ArmClient GetFrontDoorClient()
    {
        string userAssignedClientId = "<your managed identity client Id>";
        TokenCredential? credential = null;
        switch (_options.Value.AuthenticationType)
        {
            case AuthenticationType.DefaultAzureCredential:
                credential= new DefaultAzureCredential(new DefaultAzureCredentialOptions { ManagedIdentityClientId = userAssignedClientId });
                break;
            case AuthenticationType.EnvironmentCredential:
                credential = new EnvironmentCredential();
                break;
            default:
                throw new NotImplementedException("Authentication type not implemented yet");
        }
        return new ArmClient(credential);
    }
}