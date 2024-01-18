using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Core.Configuration;
using bielu.Umbraco.Cdn.Core.Extensions;
using bielu.Umbraco.Cdn.Core.Services;
using bielu.Umbraco.Cdn.Models;
using bielu.Umbraco.Cdn.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Controllers;
using Umbraco.Extensions;

namespace bielu.Umbraco.Cdn.Core.Controllers;

[Route("cdn/api/management/[action]")]
public class BieluCdnManagmentController : UmbracoApiController
{
    private readonly ICdnManager _manager;
    private readonly IUmbracoContextFactory _contextFactory;
    private readonly ICdnAuditService _auditService;
    private readonly IUmbracoUrlDeliveryService _urlDeliveryService;
    private BieluCdnOptions _optionsMonitor;

    public BieluCdnManagmentController(ICdnManager manager, IUmbracoContextFactory contextFactory,
        Services.ICdnAuditService auditService, IUmbracoUrlDeliveryService urlDeliveryService, IOptionsMonitor<BieluCdnOptions> optionsMonitor) 
    {
        _manager = manager;
        _contextFactory = contextFactory;
        _auditService = auditService;
        _urlDeliveryService = urlDeliveryService;
        _optionsMonitor = optionsMonitor.CurrentValue;
        optionsMonitor.OnChange((options, name) =>
        {
            _optionsMonitor = options;
        });
    }

    public async Task<IEnumerable<AuditRecord>> GetAuditHistory()
    {
        return await _auditService.GetAllRecords();
    }

    public async Task<IEnumerable<Provider>> GetProviders(int id = -1)
    {
        return await _manager.GetProviders(id);
    }

    public async Task<Status> RefreshDomain( string providerId = null, string domain = null)
    {
        List<Status> statuses = new List<Status>();
        using (var contextReference = _contextFactory.EnsureUmbracoContext())
        {

            var hostnames = new List<string> { domain };
       
            if (!string.IsNullOrEmpty(providerId))
            {
                var service = await _manager.GetService(providerId);
                statuses.AddRange(await service.PurgeByAssignedHostnames(hostnames));
                return statuses.Merge();
            }

          
            foreach (var service in (await _manager.GetServices()).Where(x=>x.IsEnabled()))
            {
                statuses.AddRange(await service.PurgeByAssignedHostnames(hostnames));
            }
        }

        return statuses.Merge();
    }
    public async Task<Status> RefreshForNode(int id,bool descandants,bool references, string providerId = null, string domain = null)
    {
        List<Status> statuses = new List<Status>();
        using (var contextReference = _contextFactory.EnsureUmbracoContext())
        {
            var content = contextReference.UmbracoContext.Content.GetById(id);

            var urls = _urlDeliveryService.GetUrlsByContent(content, descandants, references);
            if (_optionsMonitor.ReferencePurge && references)
            {
                urls.AddRange(_urlDeliveryService.GetUrlsByReferences(content));
            }
            if (!string.IsNullOrEmpty(providerId))
            {
                var service = await _manager.GetService(providerId);
                statuses.AddRange(await service.PurgePages(urls));
                return statuses.Merge();
            }

          
            foreach (var service in (await _manager.GetServices()).Where(x=>x.IsEnabled()))
            {
                statuses.AddRange(await service.PurgePages(urls));
            }
        }

        return statuses.Merge();
    }

}