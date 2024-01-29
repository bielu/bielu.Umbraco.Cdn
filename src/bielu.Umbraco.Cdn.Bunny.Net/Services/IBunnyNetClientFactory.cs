using bielu.Umbraco.Cdn.Akamai.Configuration;
using bielu.Umbraco.Cdn.Bunny.Net.Api.Service;
using bielu.Umbraco.Cdn.Bunny.Net.CCU.Service;
using Microsoft.Extensions.Options;

namespace bielu.Umbraco.Cdn.Akamai.Services;

public interface IBunnyNetClientFactory
{
    public BunnyNetApiClient CreateBunnyNetApiClient();
    public BunnyNetEdgeApiClient CreateBunnyNetEdgeApiClient();
    public BunnyNetStreamApiClient CreateBunnyNetStreamApiClient();
}

public class BunnyNetClientFactory : IBunnyNetClientFactory
{
    private readonly IHttpClientFactory _httpClientFactory;

    public BunnyNetClientFactory(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public BunnyNetApiClient CreateBunnyNetApiClient()
    {
        var client = _httpClientFactory.CreateClient("BunnyNetApiClient");
        return new BunnyNetApiClient(client);
    }
    public BunnyNetEdgeApiClient CreateBunnyNetEdgeApiClient()     {
        var client = _httpClientFactory.CreateClient("BunnyNetEdgeApiClient");
        return new BunnyNetEdgeApiClient(client);
    }
    public BunnyNetStreamApiClient CreateBunnyNetStreamApiClient()     {
        var client = _httpClientFactory.CreateClient("BunnyNetStreamApiClient");
        return new BunnyNetStreamApiClient(client);
    }
}