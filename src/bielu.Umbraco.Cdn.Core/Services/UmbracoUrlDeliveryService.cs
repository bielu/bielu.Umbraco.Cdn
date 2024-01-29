using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.AspNetCore;
using Umbraco.Extensions;

namespace bielu.Umbraco.Cdn.Core.Services
{
    public class UmbracoUrlDeliveryService : IUmbracoUrlDeliveryService
    {
        private readonly IDomainService _domainService;
        private readonly IUmbracoContextFactory _contextFactory;
        private readonly ITrackedReferencesService _trackedReferencesService;
        private readonly IRequestAccessor _requestAccessor;

        public UmbracoUrlDeliveryService(IDomainService domainService, IUmbracoContextFactory contextFactory,
            ITrackedReferencesService trackedReferencesService, IRequestAccessor requestAccessor)
        {
            _domainService = domainService;
            _contextFactory = contextFactory;
            _trackedReferencesService = trackedReferencesService;
            _requestAccessor = requestAccessor;
        }

        public List<string?> GetUrlsByContent(IContent content, bool includeDescendants = false, bool includeReferences = true)
        {
            List<string?> urls = new List<string?>();
            if (content == null)
            {
                return urls;
            }

            foreach (var url in GetUrl(content))
            {
                urls.AddRange(BuildDomainUrls(new List<string?>() { url }, GetDomains(content)));
            }

            return urls;
        }

        public List<string> GetUrlsByReferences(IContent content)
        {
            return GetUrlFromReferencePage(content.Id);
        }

        public List<string?> GetUrlsByContent(IPublishedContent content, bool includeDescendants = false, bool includeReferences = true)
        {
            List<string?> urls = new List<string?>();
            if (content == null)
            {
                return urls;
            }

            foreach (var url in GetUrl(content))
            {
                urls.AddRange(BuildDomainUrls(new List<string?>() { url }, GetDomains(content)));
            }

            if (includeDescendants)
            {
                foreach (var contentChild in content.Children)
                {
                    urls.AddRange(GetUrlsByContent(contentChild, includeDescendants, includeReferences));

                }
            }

            return urls;
        }

        private List<string> GetUrlFromReferencePage(int id)
        {
            var urls = new List<string>();
            var references = _trackedReferencesService.GetPagedItemsWithRelations(new[] { id }, 0, 1000, false);
            urls.AddRange(GetUrlFromReferencePage(references.Items));
            for (int i = 1; i < references.TotalPages; i++)
            {
                references = _trackedReferencesService.GetPagedItemsWithRelations(new[] { id }, i, 1000, false);
                urls.AddRange(GetUrlFromReferencePage(references.Items));
            }

            return urls;
        }

        public List<string> GetUrlsByReferences(IPublishedContent content)
        {
            return GetUrlFromReferencePage(content.Id);
        }

        private List<string?> GetUrlFromReferencePage(IEnumerable<RelationItem>? referencesItems)
        {
            List<string?> urls = new List<string?>();
            using (var contextReference = _contextFactory.EnsureUmbracoContext())
            {
                foreach (var relationItem in referencesItems)
                {
                    IPublishedContent item = null;
                    switch (relationItem.NodeUdi.EntityType)
                    {
                        case global::Umbraco.Cms.Core.Constants.UdiEntityType.DocumentType:
                            item = contextReference.UmbracoContext.Content.GetById(relationItem.NodeId);

                            break;
                        case global::Umbraco.Cms.Core.Constants.UdiEntityType.Media:
                            item = contextReference.UmbracoContext.Media.GetById(relationItem.NodeId);

                            break;
                    }

                    if (item == null) continue;
                    urls.AddRange(BuildDomainUrls(new List<string?>() { item.Url(mode: UrlMode.Absolute) },
                        GetDomains(item)));
                }
            }

            return urls;
        }

        private IEnumerable<string?> BuildDomainUrls(List<string?> urls, List<IDomain> assignedDomains)
        {
            var list = new List<string?>();
            if (urls == null || urls.All(x => string.IsNullOrWhiteSpace(x))) return list;
            if (assignedDomains == null || !assignedDomains.Any())
            {
                var domain = (_requestAccessor as AspNetCoreRequestAccessor).GetApplicationUrl()
                    .GetLeftPart(UriPartial.Authority);
                foreach (var url in urls.Where(x => !string.IsNullOrWhiteSpace(x)))
                {
                    list.Add(CombinePaths(domain, url));
                }
            }

            foreach (var url in urls.Where(x => !string.IsNullOrWhiteSpace(x)))
            {
                foreach (var domain in assignedDomains)
                {
                    list.Add(CombinePaths(domain.DomainName, url.Replace(domain?.RootContentId?.ToString(CultureInfo.InvariantCulture) ?? "", "")));
                }
            }

            return list;
        }

        private List<IDomain> GetDomains(IContent content)
        {
            var list = new List<IDomain>();
            //Termination case
            if (content == null)
            {
                return list;
            }

            list.AddRange(GetDomainByPath(content.Path));


            return list;
        }

        private List<string> GetDomains(string path)
        {
            var list = new List<string>();
            //Termination case
            if (string.IsNullOrWhiteSpace(path))
            {
                var domain = (_requestAccessor as AspNetCoreRequestAccessor).GetApplicationUrl()
                    .GetLeftPart(UriPartial.Authority);
                list.Add(domain);
                return list;
            }

            list.AddRange(GetDomainByPath(path).Select(x => x.DomainName));


            return list;
        }

        private List<IDomain> GetDomainByPath(string path)
        {
            var list = new List<IDomain>();

            foreach (var id in path.Split(','))
            {
                var numericId = int.Parse(id, CultureInfo.InvariantCulture);
                if (numericId < 0)
                {
                    continue;
                }

                var validDomain = _domainService.GetAssignedDomains(numericId, false);

                list.AddRange(validDomain);
            }


            return list;
        }

        private List<IDomain> GetDomains(IPublishedContent content)
        {
            var list = new List<IDomain>();
            //Termination case
            if (content == null)
            {
                return list;
            }

            list.AddRange(GetDomainByPath(content.Path));


            return list;
        }

        private List<string?> GetUrl(IContent content)
        {
            using (var contextReference = _contextFactory.EnsureUmbracoContext())
            {
                var urls = new List<string?>();
                var route = contextReference.UmbracoContext.Content.GetRouteById(content.Id);

                if (!string.IsNullOrWhiteSpace(route))
                {
                    urls.Add(route);
                }
                urls.Add(content.Id.ToString(CultureInfo.InvariantCulture));
                foreach (var culture in content.EditedCultures)
                {
                    urls.Add(contextReference.UmbracoContext.Content.GetRouteById(false, content.Id, culture));
                }

                return urls;
            }
        }

        private static List<string> GetUrl(IPublishedContent content)
        {
            var urls = new List<string>();
            urls.Add(content.Id.ToString(CultureInfo.InvariantCulture));
            foreach (var culture in content.Cultures)
            {
                urls.Add(content.Url(mode: UrlMode.Absolute, culture: culture.Key));
            }

            return urls;
        }

        public static string? CombinePaths(string domain, string? url)
        {
            if (url.Contains(domain))
            {
                return url;
            }

            if (domain.EndsWith("/", StringComparison.InvariantCulture) && url.StartsWith("/", StringComparison.InvariantCulture))
            {
                //strip the first / so they aren't doubled up when we combine them.
                domain = domain.TrimEnd('/');
            }
            else if (!domain.EndsWith("/", StringComparison.InvariantCulture) && !url.StartsWith("/", StringComparison.InvariantCulture))
            {
                //neight of them had a / so we have to add one.
                domain = domain + "/";
            }

            //on purpose we support only https
            return (domain.Contains("https://") ? "" : "https://") + domain + url;
        }
    }
}
