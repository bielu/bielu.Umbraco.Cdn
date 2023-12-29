using Azure.ResourceManager;

namespace bielu.Umbraco.Cdn.Azure.Services;

public interface IArmClientFactory
{
    public ArmClient GetFrontDoorClient();
}