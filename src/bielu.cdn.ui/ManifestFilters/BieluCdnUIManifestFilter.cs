using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Dashboards;
using Umbraco.Cms.Core.Manifest;

namespace bielu.cdn.ui.ManifestFilters;

public class BieluCdnUIManifestFilter: IManifestFilter
{
    public void Filter(List<PackageManifest> manifests)
    {
        var assembly = typeof(BieluCdnUIManifestFilter).Assembly;
        manifests.Add(new PackageManifest
        {
            PackageName = "Bielu Cdn Ui",
            Stylesheets = new []
            {
                "/App_Plugins/bielu.cdn.ui/style.css"
            },
            Scripts = new[]
            {
                "/App_Plugins/bielu.cdn.ui/dev-bootstrapper.js",
                "/App_Plugins/bielu.cdn.ui/bielu.cdn.ui.js",
                "/App_Plugins/bielu.cdn.ui/bielu.cdn.ui.angularController.js",
                
            }, 
            Version = assembly.GetName()?.Version?.ToString(3) ?? "0.1.0",
         
            BundleOptions =  BundleOptions.Independent
        });
    }
}
