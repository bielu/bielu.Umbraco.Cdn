using System.Collections.Generic;
using bielu.Umbraco.Cdn.Core.Configuration;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Manifest;

namespace bielu.Umbraco.Cdn.Core.ManifestFilters;

public class BieluCdnUIManifestFilter: IManifestFilter
{
    private readonly BieluCdnOptions _options;

    public BieluCdnUIManifestFilter(IOptionsMonitor<BieluCdnOptions> optionsMonitor)
    {
        _options = optionsMonitor.CurrentValue;
    }

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
                $"/App_Plugins/bielu.cdn.ui/{(_options.DevMode ? "dev-bootstrapper" : "bootstrapper")}.js",
                "/App_Plugins/bielu.cdn.ui/bielu.cdn.ui.angularController.js",
                
            }, 
            Version = assembly.GetName()?.Version?.ToString(3) ?? "0.1.0",
         
            BundleOptions =  BundleOptions.Independent
        });
    }
}
