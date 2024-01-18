using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Core.Helpers;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Media;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Extensions;

namespace bielu.Umbraco.Cdn.Core.NotitificationHandlers.Media
{
    public class MediaEventsNotificationNotificationHandler :  INotificationAsyncHandler<MediaSavedNotification>
    {
        private readonly IDomainService _domainService;
        private readonly IEnumerable<ICdnService> _cdnServices;
        private readonly IMediaTypeService _contentTypeService;
        private readonly IUmbracoContextFactory _context;
        private readonly ILogger<MediaEventsNotificationNotificationHandler> _logger;
        private readonly IImageUrlGenerator _generator;
        private readonly IAuditService _auditService;
        private readonly IBackOfficeSecurityAccessor _accessor;

        public MediaEventsNotificationNotificationHandler(IDomainService domainService,
            IEnumerable<ICdnService> cdnServices,IMediaTypeService contentTypeService, IUmbracoContextFactory context, ILogger<MediaEventsNotificationNotificationHandler> logger, IImageUrlGenerator generator, IAuditService auditService,  IBackOfficeSecurityAccessor accessor)
        {
            _domainService = domainService;
            _cdnServices = cdnServices;
            _contentTypeService = contentTypeService;
            _context = context;
            _logger = logger;
            _generator = generator;
            _auditService = auditService;
            _accessor = accessor;
        }

       
        public async Task HandleAsync(MediaSavedNotification notification, CancellationToken cancellationToken)
        {
            var domains = GetDomains();
            var nodesToRefresh = new List<string>();
           using (var context = _context.EnsureUmbracoContext().UmbracoContext){
               var currentUser = _accessor.BackOfficeSecurity.CurrentUser;

            foreach (var nodeEventInfo in notification.SavedEntities)
            {
                var node = context.Media.GetById(nodeEventInfo.Id);
                if(node == null){
                continue;
                }
                _auditService.Add(AuditType.Custom,currentUser.Id, node.Id,"CDN Refresh",  $"Cloudflare cache was purged" , $"Clouflare cache purge for domains:{string.Join(",",domains)}");

                foreach (var domain in domains)
                {
                    foreach (var host in nodeEventInfo.GetCropUrls(_generator))
                    {
                        nodesToRefresh.Add($"{(domain.Contains("http")? "": "https://")}{host.Value}");
                    }
                   
                }
                //todo: optimize as now we dont valide which domains is valid for either of cdns
                foreach (var cdnServices in _cdnServices.Where(x=>x.IsEnabled()))
                {
                    var result = Task.Run(async () =>
                    {
                        return await cdnServices.PurgePages(nodesToRefresh);
                    }).Result;
                    foreach (var resultStatus in result)
                    {
                        var message = new EventMessage("CDN", resultStatus.Message, resultStatus.MessageType ?? EventMessageType.Warning);
                        notification.Messages.Add(message);
                        if (resultStatus.MessageType == EventMessageType.Error)
                        {
                            _logger.LogError(resultStatus.Exception, resultStatus.Message);
                        }
                        if (resultStatus.MessageType == EventMessageType.Info)
                        {
                            _logger.LogInformation(resultStatus.Message);
                        }
                    }
                }}
            }
        }

        private List<string> GetDomains()
        {
            var cleanedDomains = new List<string>();
            var domains = _domainService.GetAll(false);
            
            foreach (var domain in domains)
            {
                var domainName = domain.DomainName;
                if (string.IsNullOrWhiteSpace(domainName))
                {
                    continue;
                }

                var uri = Uri.TryCreate(domainName, UriKind.Absolute, out var validUri);
                if (uri)
                {
                    cleanedDomains.Add(validUri.Host+(validUri.Port != 443 && validUri.Port != 80 ? ":"+validUri.Port : ""));
                }
                else
                {
                    cleanedDomains.Add(domainName.Split("/")[0]);
                }
            }

            return cleanedDomains;
        }
    }
}