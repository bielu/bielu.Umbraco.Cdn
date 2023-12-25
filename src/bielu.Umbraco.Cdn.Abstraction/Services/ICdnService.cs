using System.Collections.Generic;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Models;

namespace bielu.Umbraco.Cdn.Services
{
    public interface ICdnService
    {
        bool IsEnabled();
        Task<IEnumerable<Status>> PurgePages(IEnumerable<string> urls);
        Task<IEnumerable<Status>> PurgeAll();
        Task<IEnumerable<Status>> PurgeByAssignedHostnames(IEnumerable<string> domains);

        Task<IList<string>> GetSupportedHostnames();
    }
}