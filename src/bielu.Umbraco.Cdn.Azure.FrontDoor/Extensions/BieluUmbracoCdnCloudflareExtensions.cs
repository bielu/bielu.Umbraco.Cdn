using System;
using System.Collections.Generic;
using System.Reflection;
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
            builder.Services.Scan(s =>
                s.FromAssemblies(new List<Assembly>() { typeof(BieluUmbracoCdnAzureFrontDoorExtensions).Assembly })
                    .AddClasses(c => c.AssignableTo(typeof(ICdnService)))
                    .AsImplementedInterfaces()
                    .WithTransientLifetime());
            builder.Services.AddSingleton(typeof(IFrontDoorClientFactory), typeof(FrontDoorClientFactory));
            builder.Services.AddSingleton(typeof(IArmClientFactory), typeof(ArmClientFactory));

            return builder;
        }
    }
}