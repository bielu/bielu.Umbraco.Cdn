using System.Reflection;
using bielu.Umbraco.Cdn.Akamai.Configuration;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;

namespace bielu.Umbraco.Cdn.Akamai.Extensions
{
    public static class AkamaiDependencyInjectionExtensions
    {
        public static IUmbracoBuilder AddAkamaiCdnProvider(
            this IUmbracoBuilder builder)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));
            var positionOptions = new BunnyNetOptions();
            builder.Config.GetSection(BunnyNetOptions.SectionName).Bind(positionOptions);

            builder.Services.AddOptions<BunnyNetOptions>().BindConfiguration(BunnyNetOptions.SectionName);
            builder.Services.Scan(s =>
                s.FromAssemblies(new List<Assembly>() { typeof(AkamaiDependencyInjectionExtensions).Assembly })
                    .AddClasses(c => c.AssignableTo(typeof(ICdnService)))
                    .AsImplementedInterfaces()
                    .WithTransientLifetime());
          //  builder.Services.AddSingleton(typeof(IBunnyNetClientFactory), typeof(BunnyNetClientFactory));
        
            return builder;
        }
    }
}