using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Models;
using Umbraco.Cms.Core.Web;

namespace bielu.Umbraco.Cdn.Core.Services;

public class CdnManager : ICdnManager
{
    private readonly IEnumerable<ICdnService> _services;
    private readonly IUmbracoContextFactory _contextFactory;
    private readonly IEnumerable<Provider> _providers;

    public CdnManager(IEnumerable<ICdnService> services, IUmbracoContextFactory contextFactory)
    {
        _services = services;
        _contextFactory = contextFactory;
        using (var contextReference = _contextFactory.EnsureUmbracoContext())
        {
            var umbracoDomains = contextReference.UmbracoContext.Domains.GetAll(false);

            _providers = umbracoDomains.SelectMany(domain =>
            {
                return services.Select(x => new Provider()
                {
                    Name = x.GetType().Name,
                    Id = x.GetType().Name,
                    NodeId = domain.ContentId,
                    SupportedHostnames = Task.Run(async () =>
                    {
                        var supportedHostNames = await x.GetSupportedHostnames();
                        return umbracoDomains.Where(domain => supportedHostNames.Contains(domain.Name))
                            .Select(domain => domain.Name).ToList();
                    }).Result
                });
            });
        }
    }

    public async Task<IEnumerable<Provider>> GetProviders(int guid)
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