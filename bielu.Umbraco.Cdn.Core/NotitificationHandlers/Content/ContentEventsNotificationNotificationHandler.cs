using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Core.Services;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace bielu.Umbraco.Cdn.Core.NotitificationHandlers.Content
{
    public class ContentEventsNotificationNotificationHandler : INotificationAsyncHandler<ContentMovingNotification>, INotificationAsyncHandler<ContentDeletingNotification>, INotificationAsyncHandler<ContentUnpublishedNotification>
    {
        private readonly IUmbracoUrlDeliveryService _umbracoUrlDeliveryService;
        private readonly IEnumerable<ICdnService> _cdnServices;

        public ContentEventsNotificationNotificationHandler(IUmbracoUrlDeliveryService umbracoUrlDeliveryService, IEnumerable<ICdnService> cdnServices)
        {
            _umbracoUrlDeliveryService = umbracoUrlDeliveryService;
            _cdnServices = cdnServices;
        }

        public async Task HandleAsync(ContentMovingNotification notification, CancellationToken cancellationToken)
        {
            var pages = new List<string>();
            foreach (var content in notification.MoveInfoCollection)
            {
                pages.AddRange(_umbracoUrlDeliveryService.GetUrlsById(content.Entity));
            }
            //todo: optimize as now we dont valide which domains is valid for either of cdns
            foreach (var cdnServices in   _cdnServices)
            {
                cdnServices.PurgePages(pages);
            }
        }

    

        public async Task HandleAsync(ContentDeletingNotification notification, CancellationToken cancellationToken)
        {
            var pages = new List<string>();
            foreach (var content in notification.DeletedEntities)
            {
                pages.AddRange(_umbracoUrlDeliveryService.GetUrlsById(content));
            }
            //todo: optimize as now we dont valide which domains is valid for either of cdns
            foreach (var cdnServices in   _cdnServices)
            {
                cdnServices.PurgePages(pages);
            }
        }

        public async Task HandleAsync(ContentUnpublishedNotification notification, CancellationToken cancellationToken)
        {
            var pages = new List<string>();
            foreach (var content in notification.UnpublishedEntities)
            {
                pages.AddRange(_umbracoUrlDeliveryService.GetUrlsById(content));
            }
            //todo: optimize as now we dont valide which domains is valid for either of cdns
            foreach (var cdnServices in   _cdnServices)
            {
                cdnServices.PurgePages(pages);
            }
        }

       
    }
}