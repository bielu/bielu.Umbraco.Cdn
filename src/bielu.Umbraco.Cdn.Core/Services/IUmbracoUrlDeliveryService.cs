using System.Collections.Generic;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;

namespace bielu.Umbraco.Cdn.Core.Services
{
    public interface IUmbracoUrlDeliveryService
    {
        public List<string> GetUrlsByContent(IContent content, bool includeDescendants = false, bool includeReferences = true);
        public List<string> GetUrlsByReferences(IContent content);
        public List<string> GetUrlsByContent(IPublishedContent? content, bool includeDescendants = false, bool includeReferences = true);
        public List<string> GetUrlsByReferences(IPublishedContent content);
    }
}