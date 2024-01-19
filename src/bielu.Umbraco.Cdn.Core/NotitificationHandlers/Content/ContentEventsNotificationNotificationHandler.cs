using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Core.Configuration;
using bielu.Umbraco.Cdn.Core.Services;
using bielu.Umbraco.Cdn.Services;
using Lucene.Net.Util;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Core.Services;

namespace bielu.Umbraco.Cdn.Core.NotitificationHandlers.Content
{
    public class ContentEventsNotificationNotificationHandler : INotificationAsyncHandler<ContentMovingNotification>,
        INotificationAsyncHandler<ContentSavedNotification>,
        INotificationAsyncHandler<ContentDeletingNotification>,
        INotificationAsyncHandler<ContentPublishingNotification>,
        INotificationAsyncHandler<ContentUnpublishingNotification>,
        INotificationAsyncHandler<ContentUnpublishedNotification>,
        INotificationAsyncHandler<ContentPublishedNotification>
    {
        private readonly IUmbracoUrlDeliveryService _umbracoUrlDeliveryService;
        private readonly IEnumerable<ICdnService> _cdnServices;
        private readonly ILogger<ContentEventsNotificationNotificationHandler> _logger;
        private readonly ICdnAuditService _auditService;
        private  BieluCdnOptions _configuration;

        public ContentEventsNotificationNotificationHandler(IUmbracoUrlDeliveryService umbracoUrlDeliveryService,
            IEnumerable<ICdnService> cdnServices, ILogger<ContentEventsNotificationNotificationHandler> logger,
            ICdnAuditService auditService, IOptionsMonitor<BieluCdnOptions> configuration)
        {
            _umbracoUrlDeliveryService = umbracoUrlDeliveryService;
            _cdnServices = cdnServices;
            _logger = logger;
            _auditService = auditService;
            _configuration = configuration.CurrentValue;
            configuration.OnChange((options, name) => { _configuration = options; });

        }

        public async Task HandleAsync(ContentMovingNotification notification, CancellationToken cancellationToken)
        {
            var pages = new List<string>();
            foreach (var content in notification.MoveInfoCollection)
            {
                pages.AddRange(await GetPages(content.Entity));
            }

            //todo: optimize as now we dont valide which domains is valid for either of cdns
            foreach (var cdnServices in _cdnServices.Where(x=>x.IsEnabled()))
            {
                var result = Task.Run(async () => { return await cdnServices.PurgePages(pages); }).Result;
                var errors = false;
                EventMessage message;
                if (result.Any(x => !x.Success))
                {
                    foreach (var resultStatus in result.Where(x => !x.Success))
                    {
                        if (resultStatus.MessageType == EventMessageType.Error)
                        {
                            _logger.LogError(resultStatus.Exception, resultStatus.Message);
                            errors = true;
                        }
                    }


                    message = new EventMessage("CDN", result.FirstOrDefault(x => !x.Success).Message,
                        EventMessageType.Error);
                }
                else
                {
                    message = new EventMessage("CDN", result.FirstOrDefault(x => x.Success).Message,
                        EventMessageType.Info);
                }

                notification.Messages.Add(message);
            }
        }

        private async Task<List<string>> GetPages(IContent content)
        {
            var pages = new List<string>();
            if (_configuration.Auditing)
            {
             await _auditService.LogRefresh( content.Id);
            }

            pages.AddRange(_umbracoUrlDeliveryService.GetUrlsByContent(content));
            if (_configuration.ReferencePurge)
            {
                pages.AddRange(_umbracoUrlDeliveryService.GetUrlsByReferences(content));
            }

            return pages;
        }
        public async Task HandleAsync(ContentDeletingNotification notification, CancellationToken cancellationToken)
        {
            var pages = new List<string>();

            foreach (var content in notification.DeletedEntities)
            {
                pages.AddRange(await GetPages(content));
            }

            //todo: optimize as now we dont valide which domains is valid for either of cdns
            foreach (var cdnServices in _cdnServices.Where(x=>x.IsEnabled()))
            {
                try
                {
                    var result = Task.Run(async () => { return await cdnServices.PurgePages(pages); }).Result;
                    //todo move to helper method

                    EventMessage message;

                    foreach (var resultStatus in result)
                    {
                        if (resultStatus.MessageType == EventMessageType.Error)
                        {
                            _logger.LogError(resultStatus.Exception, resultStatus.Message);
                        }
                        else
                        {
                            _logger.LogInformation(resultStatus.Message);
                        }
                    }

                    if (result.Any(x => !x.Success))
                    {
                        message = new EventMessage("CDN", result.FirstOrDefault(x => !x.Success).Message,
                            EventMessageType.Error);
                    }
                    else
                    {
                        message = new EventMessage("CDN", result.FirstOrDefault(x => x.Success).Message,
                            EventMessageType.Info);
                    }

                    notification.Messages.Add(message);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Exception on sending request to api");
                }
            }
        }

        public async Task HandleAsync(ContentUnpublishedNotification notification, CancellationToken cancellationToken)
        {
            if (!notification.State.ContainsKey("purgedUrls"))
            {
                return;
            }

            var pages = notification.State["purgedUrls"] as List<string>;


            //todo: optimize as now we dont valide which domains is valid for either of cdns
            foreach (var cdnServices in _cdnServices)
            {
                try
                {
                    var result = Task.Run(async () => { return await cdnServices.PurgePages(pages); }).Result;
                    EventMessage message;

                    foreach (var resultStatus in result)
                    {
                        if (resultStatus.MessageType == EventMessageType.Error)
                        {
                            _logger.LogError(resultStatus.Exception, resultStatus.Message);
                        }
                        else
                        {
                            _logger.LogInformation(resultStatus.Message);
                        }
                    }

                    if (result.Any(x => !x.Success))
                    {
                        message = new EventMessage("CDN", result.FirstOrDefault(x => !x.Success).Message,
                            EventMessageType.Error);
                    }
                    else
                    {
                        message = new EventMessage("CDN", result.FirstOrDefault(x => x.Success).Message,
                            EventMessageType.Info);
                    }

                    notification.Messages.Add(message);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Exception on sending request to api");
                }
            }
        }

        public async Task HandleAsync(ContentPublishedNotification notification, CancellationToken cancellationToken)
        {
            var pages = new List<string>();
            foreach (var content in notification.PublishedEntities)
            {
                pages.AddRange(await GetPages(content));
            }

            try
            {
                //todo: optimize as now we dont valide which domains is valid for either of cdns
                foreach (var cdnServices in _cdnServices.Where(x=>x.IsEnabled()))
                {
                    var result = Task.Run(async () => { return await cdnServices.PurgePages(pages); }).Result;
                    EventMessage message;

                    foreach (var resultStatus in result)
                    {
                        if (resultStatus.MessageType == EventMessageType.Error)
                        {
                            _logger.LogError(resultStatus.Exception, resultStatus.Message);
                        }
                        else
                        {
                            _logger.LogInformation(resultStatus.Message);
                        }
                    }

                    if (result.Any(x => !x.Success))
                    {
                        message = new EventMessage("CDN", result.FirstOrDefault(x => !x.Success).Message,
                            EventMessageType.Error);
                    }
                    else
                    {
                        message = new EventMessage("CDN", result.FirstOrDefault(x => x.Success).Message,
                            EventMessageType.Info);
                    }

                    notification.Messages.Add(message);
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "failed on handling publish ");
            }
        }

        public async Task HandleAsync(ContentUnpublishingNotification notification, CancellationToken cancellationToken)
        {
            var pages = new List<string>();
            foreach (var content in notification.UnpublishedEntities)
            {
                pages.AddRange(await GetPages(content));
            }

            notification.State["purgedUrls"] = pages;
        }

        public async Task HandleAsync(ContentPublishingNotification notification, CancellationToken cancellationToken)
        {
            try
            {
              var pages = new List<string>();


                foreach (var content in notification.PublishedEntities)
                {
                    if (content.Published)
                    {
                        pages.AddRange(await GetPages(content));
                    }
                }

                notification.State["purgedUrls"] = pages;
            }
            catch (Exception e)
            {
            }
        }

        public async Task HandleAsync(ContentSavedNotification notification, CancellationToken cancellationToken)
        {
            if (!_configuration.Preview)
            {
                return;
            }

            try
            {
                var pages = new List<string>();
                   foreach (var content in notification.SavedEntities)
                {
                    if (content.Published)
                    {
                        pages.AddRange(await GetPages(content));
                    }
                }

                foreach (var cdnServices in _cdnServices.Where(x=>x.IsEnabled()))
                {
                    var result = Task.Run(async () => { return await cdnServices.PurgePages(pages); }).Result;
                    EventMessage message;

                    foreach (var resultStatus in result)
                    {
                        if (resultStatus.MessageType == EventMessageType.Error)
                        {
                            _logger.LogError(resultStatus.Exception, resultStatus.Message);
                        }
                        else
                        {
                            _logger.LogInformation(resultStatus.Message);
                        }
                    }

                    if (result.Any(x => !x.Success))
                    {
                        message = new EventMessage("CDN", result.FirstOrDefault(x => !x.Success).Message,
                            EventMessageType.Error);
                    }
                    else
                    {
                        message = new EventMessage("CDN", result.FirstOrDefault(x => x.Success).Message,
                            EventMessageType.Info);
                    }

                    notification.Messages.Add(message);
                }
            }
            catch (Exception e)
            {
            }
        }
    }
}