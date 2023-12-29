using bielu.Umbraco.Cdn.Akamai.CCU.Interface;
using bielu.Umbraco.Cdn.Akamai.Configuration;
using bielu.Umbraco.Cdn.Akamai.FastPurge.Interface;
using bielu.Umbraco.Cdn.Models;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Extensions;
using Body = bielu.Umbraco.Cdn.Akamai.CCU.Interface.Body;
using Response3 = bielu.Umbraco.Cdn.Akamai.CCU.Interface.Response3;
using Response6 = bielu.Umbraco.Cdn.Akamai.FastPurge.Interface.Response6;

namespace bielu.Umbraco.Cdn.Akamai.Services
{
    public class AkamaiCdnService : ICdnService
    {
        private readonly IAkamaiFastPurgeClient _akamaiFastPurgeClient;
        private readonly ILogger<AkamaiCdnService> _logger;
        private readonly IUmbracoContextFactory _factory;
        private AkamaiOptions _options;
        private readonly IAkamaiCcuClient _akamaiCcuClient;

        public AkamaiCdnService(IAkamaiClientFactory akamaiClientFactory, ILogger<AkamaiCdnService> logger,
            IOptionsMonitor<AkamaiOptions> optionsMonitor, IUmbracoContextFactory factory)
        {
            _akamaiFastPurgeClient = akamaiClientFactory.CreateFastPurgeClient();
            _akamaiCcuClient = akamaiClientFactory.CreateCcuClient();
            _logger = logger;
            _factory = factory;
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
            using (var contextReference = _factory.EnsureUmbracoContext())
            {
                var domains = contextReference.UmbracoContext.Domains.GetAll(false);
                return await PurgeByAssignedHostnames(domains.Select(x => x.Name));
            }
        }

        public async Task<IEnumerable<Status>> PurgeByAssignedHostnames(IEnumerable<string> domains)
        {
            var statuses = new List<Status>();

            using (var contextReference = _factory.EnsureUmbracoContext())
            {
                var umbracoDomains = contextReference.UmbracoContext.Domains.GetAll(false)
                    .Where(x => domains.Contains(x.Name));

                foreach (var domain in domains)
                {
                    var response = await _akamaiCcuClient.PostRequestAsync(new Body()
                    {
                        Metadata =
                            "<?xml version=\\\"1.0\\\"?>\\n <eccu>\\n  " +
                            "<match:recursive-dirs value=\\\"/\\\">\\n    " +
                            "     <revalidate>now</revalidate>\\n  " +
                            " </match:recursive-dirs>\\n</eccu>",
                        PropertyName = domain,
                        RequestName = "Invalidate " + domain,
                    }, _options.SwitchKey);
                    statuses.Add(await ParseStatus(response));
                    ;
                }


                return statuses;
            }
        }

        private async Task<Status> ParseStatus(Response3 response)
        {
            var finalResponse = new Status();
            finalResponse.Success = response.Status == Response3Status.SUCCEEDED ;
            finalResponse.Errors = finalResponse.Success
                ? null
                : new List<Errors>() { new Errors() { Message = response.ExtendedStatusMessage } };
            return finalResponse;
        }

        public async Task<IList<string>> GetSupportedHostnames()
        {
            return new List<string>();
        }
    }
}