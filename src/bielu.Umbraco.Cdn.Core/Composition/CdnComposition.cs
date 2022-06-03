using bielu.Umbraco.Cdn.Core.NotitificationHandlers.Content;
using bielu.Umbraco.Cdn.Core.NotitificationHandlers.Domain;
using bielu.Umbraco.Cdn.Core.NotitificationHandlers.Media;
using bielu.Umbraco.Cdn.Core.Services;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;

namespace bielu.Umbraco.Cdn.Core.Composition
{
    public class CdnComposition : IComposer
    {
        public void Compose(IUmbracoBuilder composition)
        {
            //services
            composition.Services.AddTransient(typeof(IUmbracoUrlDeliveryService), typeof(UmbracoUrlDeliveryService));
            
            //content
            composition
                .AddNotificationAsyncHandler<ContentMovingNotification,ContentEventsNotificationNotificationHandler>()
                .AddNotificationAsyncHandler<ContentDeletingNotification,ContentEventsNotificationNotificationHandler>()
                .AddNotificationAsyncHandler<ContentUnpublishedNotification,ContentEventsNotificationNotificationHandler>();
        
            //domain
            composition
                .AddNotificationAsyncHandler<DomainSavedNotification,DomainEventNotificationNotificationHandler>() 
                .AddNotificationAsyncHandler<DomainDeletedNotification,DomainEventNotificationNotificationHandler>();
            
            composition
                .AddNotificationAsyncHandler<MediaMovedNotification,MediaEventsNotificationNotificationHandler>()
                .AddNotificationAsyncHandler<MediaCacheRefresherNotification,MediaEventsNotificationNotificationHandler>();
        }
    }
    
}