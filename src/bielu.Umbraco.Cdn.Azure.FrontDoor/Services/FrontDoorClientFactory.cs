using Azure.Core;
using Azure.ResourceManager.FrontDoor;
using Azure.ResourceManager.Resources;
using bielu.Umbraco.Cdn.Azure.Models;
using Microsoft.Extensions.Options;

namespace bielu.Umbraco.Cdn.Azure.Services;

public class FrontDoorClientFactory : IFrontDoorClientFactory
{
    private readonly IArmClientFactory _armClientFactory;
    private readonly IOptionsMonitor<FrontDoorOptions> _frontDoorOptions;

    public FrontDoorClientFactory(IArmClientFactory armClientFactory, IOptionsMonitor<FrontDoorOptions> frontDoorOptions)
    {
        _armClientFactory = armClientFactory;
        _frontDoorOptions = frontDoorOptions;
    }

    public  FrontDoorResource GetFrontDoorClient()
    {
        var armClient = _armClientFactory.GetFrontDoorClient();
        string resourceGroupName =_frontDoorOptions.CurrentValue.ResourceGroupName;
        SubscriptionResource subscription =  armClient.GetSubscriptionResource(new ResourceIdentifier(_frontDoorOptions.CurrentValue.SubscriptionId));
        ResourceGroupCollection resourceGroups = subscription.GetResourceGroups();
        ResourceGroupResource resourceGroup =  resourceGroups.Get(resourceGroupName);
        return resourceGroup.GetFrontDoor(_frontDoorOptions.CurrentValue.FrontDoorName).Value;
    }
}