using System.Collections.Generic;
using Umbraco.Cms.Core.Models;

namespace bielu.Umbraco.Cdn.Core.Services
{
    public interface IUmbracoUrlDeliveryService
    {
        public List<string> GetUrlsById(IContent content, bool includeDescendants = false);
    }
}