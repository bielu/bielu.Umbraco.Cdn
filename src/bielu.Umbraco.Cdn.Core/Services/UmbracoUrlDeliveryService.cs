using System;
using System.Collections.Generic;
using System.Linq;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Extensions;

namespace bielu.Umbraco.Cdn.Core.Services
{
    public class UmbracoUrlDeliveryService : IUmbracoUrlDeliveryService
    {
        private readonly IDomainService _domainService;
        private readonly IUmbracoContextFactory _contextFactory;

        public UmbracoUrlDeliveryService(IDomainService domainService, IUmbracoContextFactory contextFactory)
        {
            _domainService = domainService;
            _contextFactory = contextFactory;
        }

        public List<string> GetUrlsById(IContent content, bool includeDescendants = false)
        {
            List<string> urls = new List<string>();
            if (content == null)
            {
                return urls;
            }
            foreach (var url in GetUrl(content))
            {
                urls.AddRange(BuildDomainUrls(new List<string>() { url }, GetDomains(content)));

            }
            return urls;
        }

        private IEnumerable<string> BuildDomainUrls(List<string> urls, List<IDomain> assignedDomains)
        {
            var list = new List<string>();
            if (urls == null || urls.All(x=>string.IsNullOrWhiteSpace(x))) return list;
            if(assignedDomains == null || !assignedDomains.Any()) return list;
            foreach (var url in urls. Where(x=>!string.IsNullOrWhiteSpace(x)))
            {
                foreach (var domain in assignedDomains)
                {
                    list.Add(CombinePaths(domain.DomainName,url.Replace(domain.RootContentId.ToString(),"")));
                }
            }

            return list;
        }

        private List<IDomain> GetDomains(IContent content)
        {
            var list = new List<IDomain>();
            //Termination case
            if (content == null )
            {
                return list;
            }

            foreach (var id in content.Path.Split(','))
            {
                var numericId = int.Parse(id);
                if (numericId < 0)
                {
                    continue;
                }

                var validDomain = _domainService.GetAssignedDomains(numericId, false);

                list.AddRange(validDomain);
            }


            return list;
        }
        private List<string> GetUrl(IContent content)
        {
            using (var contextReference = _contextFactory.EnsureUmbracoContext())
            {
                var urls = new List<string>();
                var route = contextReference.UmbracoContext.Content.GetRouteById(content.Id);
             
                if (!string.IsNullOrWhiteSpace(route))
                {
                  urls.Add(route);
                }
                urls.Add(content.Id.ToString());
                    IPublishedContent publishedContent = contextReference.UmbracoContext.Content.GetById(content.Id);
                    foreach (var culture in content.EditedCultures)
                    {
                        urls.Add(contextReference.UmbracoContext.Content.GetRouteById(false, content.Id, culture));
                    }
                    return urls;
            }
        }
        public string CombinePaths(string domain, string url)
        {
            if (url.Contains(domain))
            {
                return url;
            }
            if(domain.EndsWith("/") && url.StartsWith("/"))
            {
                //strip the first / so they aren't doubled up when we combine them.
                domain = domain.TrimEnd('/');
            }
            else if(!domain.EndsWith("/") && !url.StartsWith("/"))
            {
                //neight of them had a / so we have to add one. 
                domain = domain + "/";
            }
            //on purpose we support only https
            return (domain.Contains("https://")? "": "https://")+ domain + url;
        }
    }
}