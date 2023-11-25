using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Core.Extensions;
using bielu.Umbraco.Cdn.Core.Services;
using bielu.Umbraco.Cdn.Models;
using Microsoft.AspNetCore.Mvc;
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

    public BieluCdnManagmentController(ICdnManager manager, IUmbracoContextFactory contextFactory,
        Services.ICdnAuditService auditService)
    {
        _manager = manager;
        _contextFactory = contextFactory;
        _auditService = auditService;
    }

    public async Task<IEnumerable<AuditRecord>> GetAuditHistory()
    {
        return await _auditService.GetAllRecords();
    }

    public async Task<IEnumerable<Provider>> GetProviders(int id = -1)
    {
        return await _manager.GetProviders(id);
    }

    public async Task<Status> RefreshForNode(int id, string providerId = null, string domain = null)
    {
        List<Status> statuses = new List<Status>();
        using (var contextReference = _contextFactory.EnsureUmbracoContext())
        {
            var content = contextReference.UmbracoContext.Content.GetById(id);
            var domains = contextReference.UmbracoContext.Domains.GetAssigned(content.Id);
            if (!string.IsNullOrWhiteSpace(domain))
            {
                domains = domains.Where(x => x.Name.Contains(domain));
            }

            var urls = GenerateUrls(content, domains);
            if (!string.IsNullOrEmpty(providerId))
            {
                var service = await _manager.GetService(providerId);
                statuses.AddRange(await service.PurgePages(urls));
                return statuses.Merge();
            }

            foreach (var service in await _manager.GetServices())
            {
                statuses.AddRange(await service.PurgePages(urls));
            }
        }

        return statuses.Merge();
    }

    private IEnumerable<string> GenerateUrls(IPublishedContent content, IEnumerable<Domain> domains)
    {
        var urls = new List<string>();
        foreach (var domain in domains)
        {
            urls.Add($"https://{domain.Name}{content.Url(mode: UrlMode.Relative)}");
        }

        return urls;
    }
}