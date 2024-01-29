using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Core.Logging;
using bielu.Umbraco.Cdn.Core.Services;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace bielu.Umbraco.Cdn.Core.NotitificationHandlers.Domain
{
    public class DomainEventNotificationNotificationHandler : INotificationAsyncHandler<DomainSavedNotification>,
        INotificationAsyncHandler<DomainDeletedNotification>
    {
        private readonly IUmbracoUrlDeliveryService _umbracoUrlDeliveryService;
        private readonly IEnumerable<ICdnService> _cdnServices;
        private readonly ILogger<DomainEventNotificationNotificationHandler> _logger;

        public DomainEventNotificationNotificationHandler(IUmbracoUrlDeliveryService umbracoUrlDeliveryService,
            IEnumerable<ICdnService> cdnServices, ILogger<DomainEventNotificationNotificationHandler> logger)
        {
            _umbracoUrlDeliveryService = umbracoUrlDeliveryService;
            _cdnServices = cdnServices;
            _logger = logger;
        }

        public async Task HandleAsync(DomainSavedNotification notification, CancellationToken cancellationToken)
        {
            //todo: optimize as now we dont valide which domains is valid for either of cdns
            foreach (var cdnServices in _cdnServices.Where(x=>x.IsEnabled()))
            {
                //todo: split on / as umbraco is dump to count / as part of domain
                var result = Task.Run(async () =>
                {
                    return await cdnServices.PurgeByAssignedHostnames(
                        notification.SavedEntities.Select(x => x.DomainName));
                }).Result;
                foreach (var resultStatus in result)
                {
                    var message = new EventMessage("CDN", resultStatus.Message, resultStatus.MessageType ?? EventMessageType.Warning);
                    notification.Messages.Add(message);
                    if (resultStatus.MessageType == EventMessageType.Error)
                    {
                        _logger.LogErrors(resultStatus.Exception, resultStatus.Message);
                    }
                }
            }
        }


        public async Task HandleAsync(DomainDeletedNotification notification, CancellationToken cancellationToken)
        {
            //todo: optimize as now we dont valide which domains is valid for either of cdns
            foreach (var cdnServices in _cdnServices.Where(x=>x.IsEnabled() ))
            {
                //todo: split on / as umbraco is dump to count / as part of domain
                var result = await cdnServices.PurgeByAssignedHostnames(
                        notification.DeletedEntities.Select(x => x.DomainName));
                foreach (var resultStatus in result)
                {
                    var message = new EventMessage("CDN", resultStatus.Message, resultStatus.MessageType ?? EventMessageType.Warning);
                    notification.Messages.Add(message);
                    if (resultStatus.MessageType == EventMessageType.Error)
                    {
                        _logger.LogErrors(resultStatus.Exception, resultStatus.Message);
                    }
                }
            }
        }
    }
}
