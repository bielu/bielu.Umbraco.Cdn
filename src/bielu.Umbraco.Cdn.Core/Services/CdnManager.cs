using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Models;
using bielu.Umbraco.Cdn.Services;
using Umbraco.Cms.Core.Web;

namespace bielu.Umbraco.Cdn.Core.Services;

public class CdnManager : ICdnManager
{
    private readonly IEnumerable<ICdnService> _services;
    private readonly IUmbracoContextFactory _contextFactory;

    private  IEnumerable<Provider> _providers
    {
        get
        {
            using (var contextReference = _contextFactory.EnsureUmbracoContext())
            {
                var umbracoDomains = contextReference.UmbracoContext.Domains.GetAll(false);

         
                    return _services.Select(x => new Provider()
                    {
                        Name = x.GetType().Name,
                        Id = x.GetType().Name,
                        Version = x.GetType().Assembly.GetName().Version.ToString(),
                        Enabled = x.IsEnabled(),
                        SupportedHostnames = Task.Run(async () =>
                        {
                            if (!x.IsEnabled())
                            {
                                return null;
                            }
                            var supportedHostNames = await x.GetSupportedHostnames();
                            return umbracoDomains.Where(domain =>  supportedHostNames.Any(zone=>domain.Name.Contains(zone)))
                                .Select(domain => domain.Name).ToList();
                        }).Result
                    });
            }
        }
    }

    public CdnManager(IEnumerable<ICdnService> services, IUmbracoContextFactory contextFactory)
    {
        _services = services;
        _contextFactory = contextFactory;
      
    }
    
    
    public async Task<IEnumerable<Provider>> GetProviders(int id)
    {
        
        return _providers;
    }

    public async Task<Provider> GetProvider(string id)
    {
        return _providers.FirstOrDefault(x => x.Id == id);
    }

    public async Task<ICdnService> GetService(string id)
    {
        return _services.FirstOrDefault(x => x.GetType().Name == id);
    }

    public async Task<IEnumerable<ICdnService>> GetServices()
    {
        return _services;
    }
}