using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using bielu.Umbraco.Cdn.Core.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
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
        private readonly IAuditService _auditService;
        private readonly IBackOfficeSecurityAccessor _accessor;
        private readonly IConfiguration _configuration;
        private readonly bool _auditing;

        public ContentEventsNotificationNotificationHandler(IUmbracoUrlDeliveryService umbracoUrlDeliveryService,
            IEnumerable<ICdnService> cdnServices, ILogger<ContentEventsNotificationNotificationHandler> logger,
            IAuditService auditService, IBackOfficeSecurityAccessor accessor, IConfiguration configuration)
        {
            _umbracoUrlDeliveryService = umbracoUrlDeliveryService;
            _cdnServices = cdnServices;
            _logger = logger;
            _auditService = auditService;
            _accessor = accessor;
            _configuration = configuration;
            _auditing = true;
            if (configuration.GetSection("bielu")?.GetSection("cdn")?.GetSection("Auditing").Exists() ?? false)
            {
                _auditing=  Convert.ToBoolean(_configuration.GetSection("bielu")?.GetSection("cdn").GetSection("Auditing"));
            }
        }

        public async Task HandleAsync(ContentMovingNotification notification, CancellationToken cancellationToken)
        {
            var pages = new List<string>();
            var currentUser = _accessor.BackOfficeSecurity.CurrentUser;
            foreach (var content in notification.MoveInfoCollection)
            {
                if (_auditing)
                {
                    _auditService.Add(AuditType.Custom, currentUser.Id, content.Entity.Id, "CDN Refresh",
                        $"CDN cache was purged", $"CDN cache purged");
                }

                pages.AddRange(_umbracoUrlDeliveryService.GetUrlsById(content.Entity));
            }

            //todo: optimize as now we dont valide which domains is valid for either of cdns
            foreach (var cdnServices in _cdnServices)
            {
                var result = Task.Run(async () => { return await cdnServices.PurgePages(pages); }).Result;
                foreach (var resultStatus in result)
                {
                    var message = new EventMessage("CDN", resultStatus.Message, resultStatus.MessageType);
                    notification.Messages.Add(message);
                    if (resultStatus.MessageType == EventMessageType.Error)
                    {
                        _logger.LogError(resultStatus.Exception, resultStatus.Message);
                    }
                }
            }
        }


        public async Task HandleAsync(ContentDeletingNotification notification, CancellationToken cancellationToken)
        {
            var pages = new List<string>();
            var currentUser = _accessor.BackOfficeSecurity.CurrentUser;

            foreach (var content in notification.DeletedEntities)
            {
                      if (_auditing)
                {
                    _auditService.Add(AuditType.Custom, currentUser.Id, content.Id, "CDN Refresh",
                        $"CDN cache was purged", $"CDN cache purged");
                }
                pages.AddRange(_umbracoUrlDeliveryService.GetUrlsById(content));
            }

            //todo: optimize as now we dont valide which domains is valid for either of cdns
            foreach (var cdnServices in _cdnServices)
            {
                try
                {
                    var result = Task.Run(async () => { return await cdnServices.PurgePages(pages); }).Result;
                    //todo move to helper method
                    foreach (var resultStatus in result)
                    {
                        var message = new EventMessage("CDN", resultStatus.Message, resultStatus.MessageType);
                        notification.Messages.Add(message);
                        if (resultStatus.MessageType == EventMessageType.Error)
                        {
                            _logger.LogError(resultStatus.Exception, resultStatus.Message);
                        }
                        else
                        {
                            _logger.LogInformation(resultStatus.Message);
                        }
                    }
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Exception on sending request to api");
                }
            }
        }

        public async Task HandleAsync(ContentUnpublishedNotification notification, CancellationToken cancellationToken)
        {
            var currentUser = _accessor.BackOfficeSecurity.CurrentUser;
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
                    foreach (var resultStatus in result)
                    {
                        var message = new EventMessage("CDN", resultStatus.Message, resultStatus.MessageType);
                        notification.Messages.Add(message);
                        if (resultStatus.MessageType == EventMessageType.Error)
                        {
                            _logger.LogError(resultStatus.Exception, resultStatus.Message);
                        }

                        if (resultStatus.MessageType == EventMessageType.Info)
                        {
                            _logger.LogInformation(resultStatus.Exception, resultStatus.Message);
                        }
                    }
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Exception on sending request to api");
                }
            }
        }

        public async Task HandleAsync(ContentPublishedNotification notification, CancellationToken cancellationToken)
        {
            var currentUser = _accessor.BackOfficeSecurity.CurrentUser;

            var pages = new List<string>();
            foreach (var content in notification.PublishedEntities)
            {
                if (_auditing)
                {
                    _auditService.Add(AuditType.Custom, currentUser.Id, content.Id, "CDN Refresh",
                        $"CDN cache was purged", $"CDN cache purged");
                }
                pages.AddRange(_umbracoUrlDeliveryService.GetUrlsById(content));
            }

            try
            {


                //todo: optimize as now we dont valide which domains is valid for either of cdns
                foreach (var cdnServices in _cdnServices)
                {
                    var result = Task.Run(async () => { return await cdnServices.PurgePages(pages); }).Result;
                    foreach (var resultStatus in result)
                    {
                        var message = new EventMessage("CDN", resultStatus.Message, resultStatus.MessageType);
                        notification.Messages.Add(message);
                        if (resultStatus.MessageType == EventMessageType.Error)
                        {
                            _logger.LogError(resultStatus.Exception, resultStatus.Message);
                        }
                        else
                        {
                            _logger.LogInformation(resultStatus.Message);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "failed on handling publish ");

            }
        }

        public async Task HandleAsync(ContentUnpublishingNotification notification, CancellationToken cancellationToken)
        {
            var currentUser = _accessor.BackOfficeSecurity.CurrentUser;
            var pages = new List<string>();


            foreach (var content in notification.UnpublishedEntities)
            {
                if (_auditing)
                {
                    _auditService.Add(AuditType.Custom, currentUser.Id, content.Id, "CDN Refresh",
                        $"CDN cache was purged", $"CDN cache purged");
                }
                pages.AddRange(_umbracoUrlDeliveryService.GetUrlsById(content));
            }

            notification.State["purgedUrls"] = pages;
        }

        public async Task HandleAsync(ContentPublishingNotification notification, CancellationToken cancellationToken)
        {
            try
            {
                var currentUser = _accessor.BackOfficeSecurity.CurrentUser;
                var pages = new List<string>();


                foreach (var content in notification.PublishedEntities)
                {
                    if (content.Published)
                    {
                        _auditService.Add(AuditType.Custom, currentUser.Id, content.Id, "CDN Refresh",
                            $"Cloudflare cache was purged", $"Clouflare cache purged");

                        pages.AddRange(_umbracoUrlDeliveryService.GetUrlsById(content));
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
            try
            {
                var currentUser = _accessor.BackOfficeSecurity.CurrentUser;
                var pages = new List<string>();


                foreach (var content in notification.SavedEntities)
                {
                    if (content.Published)
                    {
                        if (_auditing)
                        {
                            _auditService.Add(AuditType.Custom, currentUser.Id, content.Id, "CDN Refresh",
                                $"CDN cache was purged", $"CDN cache purged");
                        }
                        pages.AddRange(_umbracoUrlDeliveryService.GetUrlsById(content));
                    }
                }

                foreach (var cdnServices in _cdnServices)
                {
                    var result = Task.Run(async () => { return await cdnServices.PurgePages(pages); }).Result;
                    foreach (var resultStatus in result)
                    {
                        var message = new EventMessage("CDN", resultStatus.Message, resultStatus.MessageType);
                        notification.Messages.Add(message);
                        if (resultStatus.MessageType == EventMessageType.Error)
                        {
                            _logger.LogError(resultStatus.Exception, resultStatus.Message);
                        }
                        else
                        {
                            _logger.LogInformation(resultStatus.Message);
                        }
                    }
                }
            }
            catch (Exception e)
            {

            }
        }
    }
}