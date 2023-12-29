using Azure.ResourceManager.FrontDoor;

namespace bielu.Umbraco.Cdn.Azure.Services;

public interface IFrontDoorClientFactory
{
    public FrontDoorResource GetFrontDoorClient();
}