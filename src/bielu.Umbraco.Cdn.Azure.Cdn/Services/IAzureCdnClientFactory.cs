using Azure.ResourceManager.Cdn;

namespace bielu.Umbraco.Cdn.Azure.Cdn.Services;

public interface IAzureCdnClientFactory
{
    public ProfileResource GetCdnClient();
}