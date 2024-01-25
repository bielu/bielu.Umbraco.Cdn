using bielu.Umbraco.Cdn.Akamai.Configuration;
using bielu.Umbraco.Cdn.Bunny.Net.Api.Interface;
using bielu.Umbraco.Cdn.Models;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Web;
using Umbraco.Extensions;

namespace bielu.Umbraco.Cdn.Akamai.Services
{
    public class BunnyNetCdnService : ICdnService
    {
        private readonly IBunnyNetApiClient _bunnyNetApiClient;
        private readonly ILogger<BunnyNetCdnService> _logger;
        private readonly IUmbracoContextFactory _factory;
        private BunnyNetOptions _options;

        public BunnyNetCdnService(IBunnyNetClientFactory bunnyNetClientFactory, ILogger<BunnyNetCdnService> logger,
            IOptionsMonitor<BunnyNetOptions> optionsMonitor, IUmbracoContextFactory factory)
        {
            _bunnyNetApiClient = bunnyNetClientFactory.CreateBunnyNetApiClient();
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
            var errors = new List<Errors>();
            foreach (var VARIABLE in urls)
            {
                try
                {
                    await _bunnyNetApiClient.PurgePublic_IndexAsync(VARIABLE, null,null,true);

                }catch(Exception e)
                {
                    _logger.LogError(e, "Failed to purge page {url}", VARIABLE);
                    errors.Add(new Errors() {Message = e.Message});
                }
            }
            return new List<Status>()
            {
                new Status()
                {
                    Success = errors.Count == 0,
                    Errors = errors
                }
            };
        }

        public async Task<IEnumerable<Status>> PurgeAll()
        {
            using (var contextReference = _factory.EnsureUmbracoContext())
            {
                var domains = contextReference.UmbracoContext.Domains.GetAll(false);
                return await PurgeByAssignedHostnames(domains.Select(x => x.Name));
            }
        }

        public async Task<IEnumerable<Status>> PurgeByAssignedHostnames(IEnumerable<string?> domains)
        {
            var statuses = new List<Status>();

            using (var contextReference = _factory.EnsureUmbracoContext())
            {
             


                return statuses;
            }
        }


        public async Task<IList<string>> GetSupportedHostnames()
        {
            var response = (await _bunnyNetApiClient.PullZonePublic_IndexAsync(0, 1000,null,true));
            var items = response.Items.ToList();
            var hasNext = response.HasMoreItems;
            while (hasNext)
            {
                response = (await _bunnyNetApiClient.PullZonePublic_IndexAsync(items.Count, 1000,null,true));
                items.AddRange(response.Items);
                hasNext = response.HasMoreItems;
            }
          
            return items.SelectMany(x => x.Hostnames).Select(x=>x.Value).ToList();
        }
    }
}