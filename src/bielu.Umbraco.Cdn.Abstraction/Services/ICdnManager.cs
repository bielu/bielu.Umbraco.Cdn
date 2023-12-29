using System.Collections.Generic;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Models;

namespace bielu.Umbraco.Cdn.Services;

public interface ICdnManager
{
    Task<IEnumerable<Provider>> GetProviders(int guid);
    Task<Provider> GetProvider(string id);
    Task<ICdnService> GetService(string id);
    Task<IEnumerable<ICdnService>> GetServices();
}