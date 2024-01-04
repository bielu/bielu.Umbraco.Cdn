using System.Reflection;
using bielu.Umbraco.Cdn.Azure.Common.Extensions;
using bielu.Umbraco.Cdn.Azure.Configuration;
using bielu.Umbraco.Cdn.Azure.Services;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;

namespace bielu.Umbraco.Cdn.Azure.Extensions
{
    public static class BieluUmbracoCdnAzureFrontDoorExtensions
    {
        public static IUmbracoBuilder AddAzureFrontDoorCdnProvider(
            this IUmbracoBuilder builder)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));

            builder.AddAzureBaseServices(FrontDoorOptions.SectionName);
            
            builder.Services.Scan(s =>
                s.FromAssemblies(new List<Assembly>() { typeof(BieluUmbracoCdnAzureFrontDoorExtensions).Assembly })
                    .AddClasses(c => c.AssignableTo(typeof(ICdnService)))
                    .AsImplementedInterfaces()
                    .WithTransientLifetime());
            builder.Services.AddOptions<FrontDoorOptions>().BindConfiguration(FrontDoorOptions.SectionName);
            builder.Services.AddSingleton(typeof(IFrontDoorClientFactory), typeof(FrontDoorClientFactory));

            return builder;
        }
    }
}