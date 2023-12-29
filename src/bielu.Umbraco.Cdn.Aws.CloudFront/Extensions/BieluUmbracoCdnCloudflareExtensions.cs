using System;
using System.Collections.Generic;
using System.Reflection;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;

namespace bielu.Umbraco.Cdn.Aws.Extensions
{
    public static class BieluUmbracoCdnCloudflareExtensions
    {
        public static IUmbracoBuilder AddAwsCloudFrontCdnProvider(
            this IUmbracoBuilder builder)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));
            builder.Services.Scan(s =>
                s.FromAssemblies(new List<Assembly>() { typeof(BieluUmbracoCdnCloudflareExtensions).Assembly })
                    .AddClasses(c => c.AssignableTo(typeof(ICdnService)))
                    .AsImplementedInterfaces()
                    .WithTransientLifetime());


            return builder;
        }
    }
}