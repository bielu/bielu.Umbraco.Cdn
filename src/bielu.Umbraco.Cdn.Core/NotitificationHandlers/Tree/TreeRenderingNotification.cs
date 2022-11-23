using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace bielu.Umbraco.Cdn.Core.NotitificationHandlers.Tree
{
    public class TreeRenderingNotification : INotificationAsyncHandler<MenuRenderingNotification>
    {
        private List<string> AllowedTrees = new List<string>()
        {
            "contentTree",
            "mediaTree"
        };
        public as Task HandleAsync(MenuRenderingNotification notification, CancellationToken cancellationToken)
        {
            if (!AllowedTrees.Contains(notification.TreeAlias))
            {
                return;
            }
        }
    }
}