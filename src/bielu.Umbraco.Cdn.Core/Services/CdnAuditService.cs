using System.Collections.Generic;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Core.Configuration;
using bielu.Umbraco.Cdn.Core.Constants;
using bielu.Umbraco.Cdn.Models;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Infrastructure.Persistence.Querying;

namespace bielu.Umbraco.Cdn.Core.Services;

public class CdnAuditService : ICdnAuditService
{
    private readonly IAuditService _auditService;
    private readonly IBackOfficeSecurityAccessor _accessor;
    private readonly IUmbracoContextFactory _contextFactory;
    private readonly ISqlContext _sqlContext;
    private readonly ITrackedReferencesService _trackedReferencesService;
    private readonly IUserService _userDataService;
    private BieluCdnOptions _configuration;

    public CdnAuditService(IAuditService auditService, IBackOfficeSecurityAccessor accessor,
        IUmbracoContextFactory contextFactory,
        ISqlContext sqlContext, IOptionsMonitor<BieluCdnOptions> configuration,
        ITrackedReferencesService trackedReferencesService, IUserService userDataService)
    {
        _auditService = auditService;
        _accessor = accessor;
        _contextFactory = contextFactory;
        _sqlContext = sqlContext;
        _trackedReferencesService = trackedReferencesService;
        _userDataService = userDataService;
        _configuration = configuration.CurrentValue;
        configuration.OnChange((options, name) => { _configuration = options; });
    }

    public async Task<IEnumerable<AuditRecord>?> GetAllRecords()
    {
        if (!_configuration.Auditing)
        {
            return null;
        }

        var logs = _auditService.GetLogs(AuditType.Custom).Where(x=>x.EntityType == CdnConstants.AuditLogType);
        var records = new List<AuditRecord>();
        foreach (var auditItem in logs)
        {
            if (auditItem.EntityType != "CDN Refresh")
            {
                continue;
            }

            records.Add(new AuditRecord()
            {
                IsFromProvider = true,
                Date = auditItem.UpdateDate,
                Message = auditItem.Comment,
                Username = _userDataService.GetUserById(auditItem.UserId).Username
            });
        }

        return records;
    }
    public async Task<IEnumerable<AuditRecord>?> GetAllRecords(int id)
    {
        if (!_configuration.Auditing)
        {
            return null;
        }

        var logs = _auditService.GetPagedItemsByEntity(id,0,9999,out var all, Direction.Descending, new AuditType[]
            {
                AuditType.Custom
            }).Where(x=>x.EntityType == CdnConstants.AuditLogType);
        var records = new List<AuditRecord>();
        foreach (var auditItem in logs)
        {
            records.Add(new AuditRecord()
            {
                IsFromProvider = true,
                Date = auditItem.UpdateDate,
                Message = auditItem.Comment,
                Username = _userDataService.GetUserById(auditItem.UserId).Username
            });
        }

        return records;
    }
    public async Task<AuditRecord> GetLastRecord(int id)
    {
        if (!_configuration.Auditing)
        {
            return null;
        }

        var log = _auditService.GetPagedItemsByEntity(id, 0, 50, out var totalRecords, Direction.Descending,
            new AuditType[] { AuditType.Custom }).FirstOrDefault(x=>x.EntityType == CdnConstants.AuditLogType);
        if (log == null)
        {
            using (var context = _contextFactory.EnsureUmbracoContext())
            {
                var item = context.UmbracoContext.Content.GetById(id);
                return new AuditRecord()
                {
                    IsFromProvider = false,
                    Date = item.UpdateDate,
                    Username = _userDataService.GetUserById(item.CreatorId).Username,
                    Message = $"No purges from provider for node with id={id}",
                };
            }
        }

        return new AuditRecord()
        {
         IsFromProvider   = true,
            Date = log.CreateDate,
            Message = log.Comment,
            Username = _userDataService.GetUserById(log.UserId).Username
        };
    }

    public async Task LogRefresh(int contentId, bool descandants = false, bool references = false)
    {
        if (!_configuration.Auditing)
        {
            return;
        }

        LogRefreshInternal(contentId, -1, descandants, references);
    }

    private async Task LogRefreshInternal(int contentId, int originalId = -1, bool descandants = false,
        bool references = false)
    {
        var id = originalId == -1 ? contentId : originalId;

        _auditService.Add(AuditType.Custom, _accessor.BackOfficeSecurity.CurrentUser.Id, contentId,
            CdnConstants.AuditLogType,
            $"CDN cache was purged {(id != contentId ? " by node with id=" + id : "")}", $"CDN cache purged");
        using (var context = _contextFactory.EnsureUmbracoContext())
        {
            if (descandants)
            {
                var item = context.UmbracoContext.Content.GetById(contentId);
                foreach (var itemChild in item.Children)
                {
                    LogRefreshInternal(itemChild.Id, id, descandants, references);
                }
            }

            if (references)
            {
                var referencesPage = _trackedReferencesService.GetPagedItemsWithRelations(new[] { id }, 0, 1000, false);
                var items = referencesPage.Items.ToList();
                for (int i = 1; i < referencesPage.TotalPages; i++)
                {
                    referencesPage = _trackedReferencesService.GetPagedItemsWithRelations(new[] { id }, i, 1000, false);
                    items.AddRange(referencesPage.Items);
                }

                foreach (var item in items)
                {
                    LogRefreshInternal(item.NodeId, id, false, false);
                }
            }
        }
    }
}