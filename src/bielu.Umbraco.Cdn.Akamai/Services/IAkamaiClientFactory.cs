using bielu.Umbraco.Cdn.Akamai.Configuration;
using Microsoft.Extensions.Options;

namespace bielu.Umbraco.Cdn.Akamai.Services;

public interface IAkamaiClientFactory
{
    public IAkamaiFastPurgeClient CreateFastPurgeClient();
}

public interface IAkamaiFastPurgeClient
{
}

public class AkamaiClientFactory : IAkamaiClientFactory
{
    private readonly IHttpClientFactory _httpClientFactory;
    private  AkamaiOptions _akamaiOptions;

    public AkamaiClientFactory(IHttpClientFactory httpClientFactory, IOptionsMonitor<AkamaiOptions> optionsMonitor)
    {
        _httpClientFactory = httpClientFactory;
        _akamaiOptions = optionsMonitor.CurrentValue;
        optionsMonitor.OnChange((options, s) =>
        {
            _akamaiOptions = options;
        });
    }

    public IAkamaiFastPurgeClient CreateFastPurgeClient()
    {
        var httpClient = _httpClientFactory.CreateClient("AkamaiFastPurgeClient");
      //  var apiClient = new AkamaiFastPurgeClient(httpClient);
        //apiClient.BaseUrl = _akamaiOptions.BaseUrl;
        return null;
    }
} 