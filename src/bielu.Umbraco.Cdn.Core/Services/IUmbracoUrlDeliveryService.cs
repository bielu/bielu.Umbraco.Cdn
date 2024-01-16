using System.Collections.Generic;
using Umbraco.Cms.Core.Models;

namespace bielu.Umbraco.Cdn.Core.Services
{
    public interface IUmbracoUrlDeliveryService
    {
        public List<string> GetUrlsByIContent(IContent content, bool includeDescendants = false);
        public List<string> GetUrlsByReferences(IContent content, bool includeDescendants = false);
    }
}