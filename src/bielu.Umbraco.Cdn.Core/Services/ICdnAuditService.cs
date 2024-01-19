using System.Collections.Generic;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Models;

namespace bielu.Umbraco.Cdn.Core.Services;

public interface ICdnAuditService
{
    Task<IEnumerable<AuditRecord>?> GetAllRecords();    
    Task<IEnumerable<AuditRecord>?> GetAllRecords(int id);

    Task<AuditRecord?> GetLastRecord(int id);
    Task LogRefresh(int contentId, bool descandants = false, bool references = false);
}