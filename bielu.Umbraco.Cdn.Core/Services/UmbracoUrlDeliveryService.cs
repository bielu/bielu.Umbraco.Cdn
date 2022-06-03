using System;
using System.Collections.Generic;
using System.Linq;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;

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
            string url = GetUrl(content);
            urls.AddRange(BuildDomainUrls(new List<string>() { url }, GetDomains(content)));
            return urls;
        }

        private IEnumerable<string> BuildDomainUrls(List<string> urls, List<string> assignedDomains)
        {
            var list = new List<string>();
            if (urls == null || urls.All(x=>string.IsNullOrWhiteSpace(x))) return list;
            if(assignedDomains == null || !assignedDomains.Any()) return list;
            foreach (var url in urls. Where(x=>!string.IsNullOrWhiteSpace(x)))
            {
                foreach (var domain in assignedDomains)
                {
                    list.Add(CombinePaths(domain,url));
                }
            }

            return list;
        }

        private List<string> GetDomains(IContent content)
        {
            var list = new List<string>();
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

                list.AddRange(validDomain.Select(x => x.DomainName));
            }


            return list;
        }
        private string GetUrl(IContent content)
        {
            using (var contextReference = _contextFactory.EnsureUmbracoContext())
            {
                return contextReference.UmbracoContext.Content.GetRouteById(content.Id);
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
            return "https://"+ domain + url;
        }
    }
}