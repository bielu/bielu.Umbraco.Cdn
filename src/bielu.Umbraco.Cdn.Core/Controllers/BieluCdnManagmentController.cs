using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Core.Extensions;
using bielu.Umbraco.Cdn.Models;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Extensions;

namespace bielu.Umbraco.Cdn.Core.Controllers;
[Route("cdn/api/[controller]")]
public class BieluCdnManagmentController : UmbracoAuthorizedJsonController
{
    private readonly ICdnManager _manager;
    private readonly IUmbracoContextFactory _contextFactory;

    public BieluCdnManagmentController(ICdnManager manager, IUmbracoContextFactory contextFactory)
    {
        _manager = manager;
        _contextFactory = contextFactory;
    }

    public async Task<Status> RefreshForNode(Guid id)
    {
        List<Status> statuses = new List<Status>();
        using (var contextReference = _contextFactory.EnsureUmbracoContext())
        {
            var content = contextReference.UmbracoContext.Content.GetById(id);
            var domains = contextReference.UmbracoContext.Domains.GetAssigned(content.Id);
            var urls = GenerateUrls(content,domains);
            foreach (var service in await _manager.GetServices())
            {
                statuses.AddRange(   await service.PurgePages(urls));
            }
        }

        return statuses.Merge();
    }

    private IEnumerable<string> GenerateUrls(IPublishedContent content, IEnumerable<Domain> domains)
    {
        var urls = new List<string>();
        foreach (var domain in domains)
        {
            urls.Add($"{domain.Name}{content.Url()}");
        }

        return urls;
    }
}