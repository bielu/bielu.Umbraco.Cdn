using System.Reflection;
using bielu.Umbraco.Cdn.Akamai.Configuration;
using bielu.Umbraco.Cdn.Akamai.Services;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;

namespace bielu.Umbraco.Cdn.Akamai.Extensions
{
    public static class AkamaiDependencyInjectionExtensions
    {
        public static IUmbracoBuilder AddCloudflareCdnProvider(
            this IUmbracoBuilder builder)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));
            var positionOptions = new AkamaiOptions();
            builder.Config.GetSection(AkamaiOptions.SectionName).Bind(positionOptions);

            builder.Services.AddOptions<AkamaiOptions>().BindConfiguration(AkamaiOptions.SectionName);
            builder.Services.Scan(s =>
                s.FromAssemblies(new List<Assembly>() { typeof(AkamaiDependencyInjectionExtensions).Assembly })
                    .AddClasses(c => c.AssignableTo(typeof(ICdnService)))
                    .AsImplementedInterfaces()
                    .WithTransientLifetime());
            builder.Services.AddSingleton(typeof(IAkamaiClientFactory), typeof(AkamaiClientFactory));
        
            return builder;
        }
    }
}