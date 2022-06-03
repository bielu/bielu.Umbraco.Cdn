using System;
using System.Collections.Generic;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace bielu.Umbraco.Cdn.Cloudflare.Extensions
{
    public static class BieluUmbracoCdnCloudflareExtensions
    {
        public static IUmbracoBuilder UseBieluUmbracoCdnForCloudflare(
            this IUmbracoBuilder builder)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));
            var services = builder.Services as IServiceCollection;
            services.Scan(s =>
                s.FromAssemblies(new List<Assembly>() { typeof(IUmbracoBuilder).Assembly })
                    .AddClasses(c => c.AssignableTo(typeof(ICdnService)))
                    .AsImplementedInterfaces()
                    .WithTransientLifetime());
            return builder;
        }
    }
}