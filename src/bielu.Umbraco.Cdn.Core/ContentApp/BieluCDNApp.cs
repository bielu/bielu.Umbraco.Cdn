﻿using bielu.Umbraco.Cdn.Core.Configuration;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.ContentEditing;
using Umbraco.Cms.Core.Models.Membership;

namespace bielu.Umbraco.Cdn.Core.ContentApp;

public class BieluCdnApp  : IContentAppFactory
{
    private BieluCdnOptions _options;

    public BieluCdnApp(IOptionsMonitor<BieluCdnOptions> options)
    {
        _options = options.CurrentValue;
        options.OnChange(x =>
        {
            _options = x;
        });

    }

    public global::Umbraco.Cms.Core.Models.ContentEditing.ContentApp? GetContentAppFor(object source, IEnumerable<IReadOnlyUserGroup> userGroups)
    {
        if(_options.DisableContentApp)
            return null;
        // Can implement some logic with userGroups if needed
        // Allowing us to display the content app with some restrictions for certain groups
        if (userGroups.All(x => x.Alias.ToLowerInvariant() != global::Umbraco.Cms.Core.Constants.Security.AdminGroupAlias))
            return null;
            
        // Only show app on content items
        if (!(source is IContent))
            return null;
        // Only show app on content with certain content type alias
        // if (!content.ContentType.Alias.Equals("aliasName"))
        //    return null;
            
     

            return new global::Umbraco.Cms.Core.Models.ContentEditing.ContentApp
            {
            Alias = "bieluCdnApp",
            Name = "CDN",
            Icon = "icon-hard-drive",
            View = "/App_Plugins/bielu.cdn.ui/contentApp.html",
            Weight = 900
        };
    }
}