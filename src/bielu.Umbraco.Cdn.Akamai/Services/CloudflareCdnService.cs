using bielu.Umbraco.Cdn.Akamai.Configuration;
using bielu.Umbraco.Cdn.Akamai.Interface;
using bielu.Umbraco.Cdn.Models;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace bielu.Umbraco.Cdn.Akamai.Services
{
    public class AkamaiCdnService : ICdnService
    {
        private readonly IAkamaiFastPurgeClient _akamaiFastPurgeClient;
        private readonly ILogger<AkamaiCdnService> _logger;
        private AkamaiOptions _options;

        public AkamaiCdnService(IAkamaiClientFactory akamaiClientFactory, ILogger<AkamaiCdnService> logger,
            IOptionsMonitor<AkamaiOptions> optionsMonitor)
        {
            _akamaiFastPurgeClient = akamaiClientFactory.CreateFastPurgeClient();
            _logger = logger;
            _options = optionsMonitor.CurrentValue;
            optionsMonitor.OnChange((options, s) => { _options = options; });
        }

        public bool IsEnabled()
        {
            return !_options.Disabled;
        }

        public async Task<IEnumerable<Status>> PurgePages(IEnumerable<string> urls)
        {
            var response = await _akamaiFastPurgeClient.PostInvalidateUrlAsync(new Body6()
            {
                Objects = urls.ToArray()
            }, _options.SwitchKey, _options.Network);

            return await ParseStatus(response);
        }

        private async Task<IEnumerable<Status>> ParseStatus(Response6 response)
        {
            var finalResponse = new Status();
            finalResponse.Success = response.HttpStatus == 201 || response.HttpStatus == 200;
            finalResponse.Errors = finalResponse.Success
                ? null
                : new List<Errors>() { new Errors() { Message = response.Detail } };
            return new[] { finalResponse };
        }

        public async Task<IEnumerable<Status>> PurgeAll()
        {
            var zones = (await _akamaiFastPurgeClient.GetZones());
            var statuses = new List<Status>();
            foreach (var domain in zones)
            {
                statuses.Add(await _akamaiFastPurgeClient.PurgeCache(domain, null, true));
            }

            return statuses;
        }

        public async Task<IEnumerable<Status>> PurgeByAssignedHostnames(IEnumerable<string> domains)
        {
            var statuses = new List<Status>();
            foreach (var domain in domains)
            {
                var zone = (await _akamaiFastPurgeClient.GetZones(domain)).FirstOrDefault();
                statuses.Add(await _akamaiFastPurgeClient.PurgeCache(zone, domain));
            }

            return statuses;
        }

        public async Task<IList<string>> GetSupportedHostnames()
        {
            var zones = (await _akamaiFastPurgeClient.GetZones());
            return zones.Select(x => x.Name).ToList();
        }
    }
}