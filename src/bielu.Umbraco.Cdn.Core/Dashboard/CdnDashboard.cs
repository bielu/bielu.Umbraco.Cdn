using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Dashboards;

namespace bielu.Umbraco.Cdn.Core.Dashboard;

public class CdnDashboard: IDashboard
{
    public string[] Sections => new[] { Constants.Applications.Settings };

    public IAccessRule[] AccessRules
    {
        get
        {
            var rules = new IAccessRule[]
            {
                new AccessRule {Type = AccessRuleType.Grant, Value = Constants.Security.AdminGroupAlias}
            };
            return rules;
        }
    }

    public string Alias => "cdnDashboard";

    public string View => "/App_Plugins/bielu.cdn.ui/cdnDashboard.html";
}