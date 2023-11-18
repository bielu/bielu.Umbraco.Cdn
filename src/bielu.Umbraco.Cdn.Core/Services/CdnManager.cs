using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Models;

namespace bielu.Umbraco.Cdn.Core.Services;

public class CdnManager : ICdnManager
{
    private readonly IEnumerable<ICdnService> _services;
    private readonly IEnumerable<Provider> _providers;

    public CdnManager(IEnumerable<ICdnService> services)
    {
        _services = services;
        _providers = services.Select(x => new Provider()
        {
            Name = x.GetType().Name,
            Id = x.GetType().Name,
            SupportedHostnames = Task.Run(async ()=> await x.GetSupportedHostnames()).Result
        });
    }

    public async Task<IEnumerable<Provider>> GetProviders()
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