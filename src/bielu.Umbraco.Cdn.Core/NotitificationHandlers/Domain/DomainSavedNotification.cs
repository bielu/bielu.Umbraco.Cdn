using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Core.Services;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace bielu.Umbraco.Cdn.Core.NotitificationHandlers.Domain
{
    public class DomainEventNotificationNotificationHandler : INotificationAsyncHandler<DomainSavedNotification>,
        INotificationAsyncHandler<DomainDeletedNotification>
    {
        private readonly IUmbracoUrlDeliveryService _umbracoUrlDeliveryService;
        private readonly IEnumerable<ICdnService> _cdnServices;

        public DomainEventNotificationNotificationHandler(IUmbracoUrlDeliveryService umbracoUrlDeliveryService,
            IEnumerable<ICdnService> cdnServices)
        {
            _umbracoUrlDeliveryService = umbracoUrlDeliveryService;
            _cdnServices = cdnServices;
        }

        public async Task HandleAsync(DomainSavedNotification notification, CancellationToken cancellationToken)
        {
            //todo: optimize as now we dont valide which domains is valid for either of cdns
            foreach (var cdnServices in _cdnServices)
            {
                //todo: split on / as umbraco is dump to count / as part of domain
             await   cdnServices.PurgeByAssignedHostnames(notification.SavedEntities.Select(x => x.DomainName));
            }
        }


        public async Task HandleAsync(DomainDeletedNotification notification, CancellationToken cancellationToken)
        {
            //todo: optimize as now we dont valide which domains is valid for either of cdns
            foreach (var cdnServices in _cdnServices)
            {
                //todo: split on / as umbraco is dump to count / as part of domain
                await cdnServices.PurgeByAssignedHostnames(notification.DeletedEntities.Select(x => x.DomainName));
            }
        }
    }
}