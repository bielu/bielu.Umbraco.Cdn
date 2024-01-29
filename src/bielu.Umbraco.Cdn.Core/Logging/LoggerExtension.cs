using Microsoft.Extensions.Logging;

namespace bielu.Umbraco.Cdn.Core.Logging;

public  static partial class LoggerExtension
{
    [LoggerMessage(EventId = 1, Message = "{Message}" , Level = LogLevel.Information)]
    public static partial void LogInfo(this ILogger logger, string? message);
    [LoggerMessage(EventId = 1, Message = "{heading}:{Message}", Level = LogLevel.Information)]
    public static partial void LogInfoWithHeading(this ILogger logger, string? heading, string? message);
    [LoggerMessage(EventId = 1, Message = "{E}{Message}" , Level = LogLevel.Error)]
    public static partial void LogErrors(this ILogger logger, Exception? e, string? message);
}
