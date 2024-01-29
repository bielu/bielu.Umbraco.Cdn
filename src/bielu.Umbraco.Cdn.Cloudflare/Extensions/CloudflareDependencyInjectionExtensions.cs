using System;
using System.Collections.Generic;
using System.Reflection;
using bielu.Umbraco.Cdn.Cloudflare.Configuration;
using bielu.Umbraco.Cdn.Cloudflare.Services;
using bielu.Umbraco.Cdn.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace bielu.Umbraco.Cdn.Cloudflare.Extensions
{
    public static class CloudflareDependencyInjectionExtensions
    {
        public static IUmbracoBuilder AddCloudflareCdnProvider(
            this IUmbracoBuilder builder)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));
            var positionOptions = new CloudflareOptions();
            builder.Config.GetSection(CloudflareOptions.SectionName).Bind(positionOptions);

            builder.Services.AddOptions<CloudflareOptions>().BindConfiguration(CloudflareOptions.SectionName);
            builder.Services.Scan(s =>
                s.FromAssemblies(new List<Assembly>() { typeof(CloudflareDependencyInjectionExtensions).Assembly })
                    .AddClasses(c => c.AssignableTo(typeof(ICdnService)))
                    .AsImplementedInterfaces()
                    .WithTransientLifetime());
            builder.Services.AddSingleton(typeof(ICloudflareClient), typeof(CloudflareClient));
            switch (positionOptions.AuthenticationType)
            {
                case AuthenticationType.GlobalApiKey:
                    builder.Services.AddTransient(typeof(IClouflareAuthentication), typeof(GlobalApiKeyClouflareAuthentication));
                    break;
                case AuthenticationType.BearerToken:
                    builder.Services.AddTransient(typeof(IClouflareAuthentication), typeof(TokenApiClouflareAuthentication));
                    break;
                case AuthenticationType.Custom:
                    break;
                default:
                    throw new InvalidOperationException("Authentication type not supported");
            }
            return builder;
        }
    }
}
