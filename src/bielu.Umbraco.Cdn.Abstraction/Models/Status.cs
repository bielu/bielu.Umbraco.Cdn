#nullable enable
using System;
using System.Collections.Generic;
using Umbraco.Cms.Core.Events;

namespace bielu.Umbraco.Cdn.Models
{
    public class Status
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public string? Details { get; set; }
        public List<Errors?>? Errors { get; set; }

        public Exception? Exception { get; set; }
        public EventMessageType? MessageType { get; set; }
    }
}