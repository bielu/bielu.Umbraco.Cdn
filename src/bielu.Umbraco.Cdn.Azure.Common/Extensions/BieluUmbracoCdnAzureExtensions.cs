using bielu.Umbraco.Cdn.Azure.Common.Configuration;
using bielu.Umbraco.Cdn.Azure.Common.Services;
using bielu.Umbraco.Cdn.Azure.Services;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;

namespace bielu.Umbraco.Cdn.Azure.Common.Extensions
{
    public static class BieluUmbracoCdnAzureExtensions
    {
        public static IUmbracoBuilder AddAzureBaseServices(
            this IUmbracoBuilder builder, string optionsSectionName)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));
            
            builder.Services.AddOptions<AzureBaseOptions>().BindConfiguration(optionsSectionName);
            builder.Services.AddSingleton(typeof(IArmClientFactory), typeof(ArmClientFactory));

            return builder;
        }
    }
}