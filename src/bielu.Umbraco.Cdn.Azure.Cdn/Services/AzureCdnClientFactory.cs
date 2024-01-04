using Azure.Core;
using Azure.ResourceManager.Cdn;
using bielu.Umbraco.Cdn.Azure.Cdn.Configuration;
using bielu.Umbraco.Cdn.Azure.Services;
using Microsoft.Extensions.Options;

namespace bielu.Umbraco.Cdn.Azure.Cdn.Services;

public class AzureCdnClientFactory : IAzureCdnClientFactory
{
    private readonly IArmClientFactory _armClientFactory;
    private AzureCdnOptions _azureCdnOptions;

    public AzureCdnClientFactory(IArmClientFactory armClientFactory, IOptionsMonitor<AzureCdnOptions> azureCdnOptions)
    {
        _armClientFactory = armClientFactory;
        _azureCdnOptions = azureCdnOptions.CurrentValue;
        azureCdnOptions.OnChange((options, s) =>
        {
            _azureCdnOptions = options;
        });
    }

    public ProfileResource GetCdnClient()
    {
        var armClient = _armClientFactory.GetFrontDoorClient();
        var resourceId = $"/subscriptions/{_azureCdnOptions.SubscriptionId}/resourcegroups/{_azureCdnOptions.ResourceGroupName}/providers/Microsoft.Cdn/profiles/{_azureCdnOptions.FrontDoorName}";
        return armClient.GetProfileResource(ResourceIdentifier.Parse(resourceId));
    }
}