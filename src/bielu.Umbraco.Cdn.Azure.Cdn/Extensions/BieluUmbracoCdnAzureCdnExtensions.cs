using System.Reflection;
using bielu.Umbraco.Cdn.Azure.Cdn.Configuration;
using bielu.Umbraco.Cdn.Azure.Cdn.Services;
using bielu.Umbraco.Cdn.Azure.Common.Extensions;
using bielu.Umbraco.Cdn.Azure.Services;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;

namespace bielu.Umbraco.Cdn.Azure.Cdn.Extensions
{
    public static class BieluUmbracoCdnAzureCdnExtensions
    {
        public static IUmbracoBuilder AddAzureCdnProvider(
            this IUmbracoBuilder builder)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));
            builder.AddAzureBaseServices(AzureCdnOptions.SectionName);
            
            builder.Services.Scan(s =>
                s.FromAssemblies(new List<Assembly>() { typeof(BieluUmbracoCdnAzureCdnExtensions).Assembly })
                    .AddClasses(c => c.AssignableTo(typeof(ICdnService)))
                    .AsImplementedInterfaces()
                    .WithTransientLifetime());
            builder.Services.AddOptions<AzureCdnOptions>().BindConfiguration(AzureCdnOptions.SectionName);
            builder.Services.AddSingleton(typeof(IAzureCdnClientFactory), typeof(AzureCdnClientFactory));

            return builder;
        }
    }
}