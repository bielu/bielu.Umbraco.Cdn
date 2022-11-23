using System;
using System.Collections.Generic;
using System.Reflection;
using bielu.Umbraco.Cdn.Cloudflare.Services;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace bielu.Umbraco.Cdn.Cloudflare.Extensions
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