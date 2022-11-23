using Umbraco.Cms.Core.Actions;

namespace bielu.Umbraco.Cdn.Core.TreeActions
{
    public class CdnTreeAction: IAction
    {
        public char Letter =>'£';

        public bool ShowInNotifier => true;

        public bool CanBePermissionAssigned => true;

        public string Icon => "link";

        public string Alias => "purgeCache";

        public string Category => "structure";
    }
}