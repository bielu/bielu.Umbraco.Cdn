using bielu.cdn.ui.ManifestFilters;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace bielu.cdn.ui.Composition;

public class BieluCdnUIComposer: IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.ManifestFilters().Append<BieluCdnUIManifestFilter>();
    }
}