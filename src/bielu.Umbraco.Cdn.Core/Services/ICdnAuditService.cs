using System.Collections.Generic;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Models;

namespace bielu.Umbraco.Cdn.Core.Services;

public interface ICdnAuditService
{
    Task<IEnumerable<AuditRecord>> GetAllRecords();
}