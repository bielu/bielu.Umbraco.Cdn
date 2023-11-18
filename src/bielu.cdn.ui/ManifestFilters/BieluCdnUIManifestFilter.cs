using Umbraco.Cms.Core.Manifest;

namespace bielu.cdn.ui.ManifestFilters;

public class BieluCdnUIManifestFilter: IManifestFilter
{
    public void Filter(List<PackageManifest> manifests)
    {
        manifests.Add(new PackageManifest
        {
            PackageName = "Bielu Cdn Ui",
            Stylesheets = new []
            {
                "~/App_Plugins/bielu.cdn.ui/style.css"
            },
            Scripts = new[]
            {
                "~/App_Plugins/bielu.cdn.ui/"
            }, 
            Version = "1.0.0"
        });
    }
}
}