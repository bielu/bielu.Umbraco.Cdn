using System.Collections.Generic;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Models;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;

namespace bielu.Umbraco.Cdn.Core.Services;

public class CdnAuditService : ICdnAuditService
{
    private readonly IAuditService _auditService;

    public CdnAuditService(IAuditService auditService)
    {
        _auditService = auditService;
    }

    public async Task<IEnumerable<AuditRecord>> GetAllRecords()
    {
        var logs = _auditService.GetLogs(AuditType.Custom);
        var records = new List<AuditRecord>();
        foreach (var VARIABLE in logs)
        {
            if (VARIABLE.EntityType !="CDN Refresh")
            {
                continue;
            }
            records.Add(new AuditRecord()
            {
                Date = VARIABLE.UpdateDate,
                Message = VARIABLE.Comment,
                
            });
        }

        return records;
    }
}