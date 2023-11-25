using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Core.TreeActions;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;

namespace bielu.Umbraco.Cdn.Core.NotitificationHandlers.Tree
{
    public class TreeRenderingNotification : INotificationAsyncHandler<MenuRenderingNotification>
    {
        private readonly ILocalizedTextService _localizationService;
        private readonly IUmbracoContextFactory _umbracoContextFactory;

        public TreeRenderingNotification(ILocalizedTextService localizationService,
            IUmbracoContextFactory umbracoContextFactory)
        {
            _localizationService = localizationService;
            _umbracoContextFactory = umbracoContextFactory;
        }
        private List<string> AllowedTrees = new List<string>()
        {
            "content",
            "media"
        };
        public async Task HandleAsync(MenuRenderingNotification notification, CancellationToken cancellationToken)
        {
            if (!AllowedTrees.Contains(notification.TreeAlias))
            {
                return;
            }
            using (var contextReference = _umbracoContextFactory.EnsureUmbracoContext())
            {
                var umbracoContext = contextReference.UmbracoContext;
                var node = int.TryParse(notification.NodeId, out int intId) ? umbracoContext.Content.GetById(intId) : umbracoContext.Content.GetById(Guid.Parse(notification.NodeId));
                if (node == null)
                {
                    return;
                }

                
                    var menu = notification.Menu.Items.Add<CdnTreeAction>(_localizationService, true, true);
                    menu.AdditionalData.Add("nodeId",node.Id);
                    menu.LaunchDialogView("/App_Plugins/bielu.cdn.ui/RefreshNodeEditor.html", "Refresh Node");
            }
        }
    }
}