using bielu.Umbraco.Cdn.Akamai.CCU.Interface;
using bielu.Umbraco.Cdn.Akamai.CCU.Service;
using bielu.Umbraco.Cdn.Akamai.Configuration;
using bielu.Umbraco.Cdn.Akamai.FastPurge.Interface;
using bielu.Umbraco.Cdn.Akamai.FastPurge.Service;
using Microsoft.Extensions.Options;

namespace bielu.Umbraco.Cdn.Akamai.Services;

public interface IAkamaiClientFactory
{
    public IAkamaiFastPurgeClient CreateFastPurgeClient();
    IAkamaiCcuClient CreateCcuClient();
}

public class AkamaiClientFactory : IAkamaiClientFactory
{
    private readonly IHttpClientFactory _httpClientFactory;
    private AkamaiOptions _akamaiOptions;

    public AkamaiClientFactory(IHttpClientFactory httpClientFactory, IOptionsMonitor<AkamaiOptions> optionsMonitor)
    {
        _httpClientFactory = httpClientFactory;
        _akamaiOptions = optionsMonitor.CurrentValue;
        optionsMonitor.OnChange((options, s) => { _akamaiOptions = options; });
    }

    public IAkamaiFastPurgeClient CreateFastPurgeClient()
    {
        if(FastPurgeClient != null)
        {
            return FastPurgeClient;
        }
        var httpClient = _httpClientFactory.CreateClient("AkamaiFastPurgeClient");
        var apiClient = new AkamaiFastPurgeClient(httpClient);
        apiClient.BaseUrl = _akamaiOptions.BaseUrl;
        FastPurgeClient = apiClient;
        return apiClient;
    }

    public IAkamaiFastPurgeClient FastPurgeClient { get; set; }

    public IAkamaiCcuClient CreateCcuClient()
    {
        if(CcuClient != null)
        {
            return CcuClient;
        }
        var httpClient = _httpClientFactory.CreateClient("AkamaiCcuClient");
        var apiClient = new AkamaiCcuClient(httpClient);
        apiClient.BaseUrl = _akamaiOptions.BaseUrl;
        CcuClient = apiClient;
        return apiClient;
    }

    public IAkamaiCcuClient CcuClient { get; set; }
}