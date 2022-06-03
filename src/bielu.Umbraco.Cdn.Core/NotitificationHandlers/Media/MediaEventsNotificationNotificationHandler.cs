using System.Threading;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace bielu.Umbraco.Cdn.Core.NotitificationHandlers.Media
{
    public class MediaEventsNotificationNotificationHandler : INotificationAsyncHandler<MediaMovedNotification>, INotificationAsyncHandler<MediaCacheRefresherNotification>
    {
        public async Task HandleAsync(MediaMovedNotification notification, CancellationToken cancellationToken)
        {
            
        }

        public async Task HandleAsync(MediaCacheRefresherNotification notification, CancellationToken cancellationToken)
        {
            
        }
    }
}