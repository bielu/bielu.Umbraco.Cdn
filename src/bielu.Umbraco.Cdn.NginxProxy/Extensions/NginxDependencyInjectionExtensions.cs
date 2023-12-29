using System;
using System.Reflection;
using bielu.Umbraco.Cdn.NginxProxy.Services;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;

namespace bielu.Umbraco.Cdn.NginxProxy.Extensions
{
    public static class NginxDependencyInjectionExtensions
    {
        public static IUmbracoBuilder UseNginxCdnProvider(
            this IUmbracoBuilder builder)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));
            //builder.Services.AddOptions<Mginxo>().BindConfiguration(CloudflareOptions.SectionName);
            builder.Services.Scan(s =>
                s.FromAssemblies(new List<Assembly>() { typeof(NginxDependencyInjectionExtensions).Assembly })
                    .AddClasses(c => c.AssignableTo(typeof(ICdnService)))
                    .AsImplementedInterfaces()
                    .WithTransientLifetime());
            builder.Services.AddSingleton(typeof(INginxProxyClient), typeof(NginxProxyClient));

            return builder;
        }
    }
}