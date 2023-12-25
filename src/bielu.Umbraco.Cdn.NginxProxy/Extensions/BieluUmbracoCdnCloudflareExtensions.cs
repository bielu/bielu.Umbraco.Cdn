using System;
using bielu.Umbraco.Cdn.NginxProxy.Services;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;

namespace bielu.Umbraco.Cdn.NginxProxy.Extensions
{
    public static class BieluUmbracoCdnCloudflareExtensions
    {
        public static IUmbracoBuilder AddBieluUmbracoCdnForCloudflare(
            this IUmbracoBuilder builder)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));
          
            builder.Services.AddSingleton(typeof(INginxProxyClient), typeof(NginxProxyClient));

            return builder;
        }
    }
}