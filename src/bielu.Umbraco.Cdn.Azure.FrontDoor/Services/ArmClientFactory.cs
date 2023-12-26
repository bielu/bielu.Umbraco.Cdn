using System;
using Azure.Core;
using Azure.Identity;
using Azure.ResourceManager;
using bielu.Umbraco.Cdn.Azure.Configuration;
using bielu.Umbraco.Cdn.Azure.Models;
using Microsoft.Extensions.Options;

namespace bielu.Umbraco.Cdn.Azure.Services;

public class ArmClientFactory : IArmClientFactory
{
    private  FrontDoorOptions _options;

    public ArmClientFactory(IOptionsMonitor<FrontDoorOptions> options)
    {
        _options = options.CurrentValue;
        options.OnChange((options, s) =>
        {
            _options = options;
        });
    }

    public ArmClient GetFrontDoorClient()
    {
        TokenCredential? credential = null;
        switch (_options.AuthenticationType)
        {
            case AuthenticationType.DefaultAzureCredential:
                credential= new DefaultAzureCredential(new DefaultAzureCredentialOptions { ManagedIdentityClientId = _options.UserAssignedClientId });
                break;
            case AuthenticationType.EnvironmentCredential:
                credential = new EnvironmentCredential();
                break;
            case AuthenticationType.ManagedIdentityCredential:
                credential = new ManagedIdentityCredential(_options.UserAssignedClientId );
                break;
            case AuthenticationType.SharedTokenCacheCredential:
                credential = new SharedTokenCacheCredential();
                break;
            default:
                throw new NotImplementedException("Authentication type not implemented yet");
        }
        return new ArmClient(credential);
    }
}