using System.Collections.Generic;
using System.Linq;
using bielu.Umbraco.Cdn.Models;

namespace bielu.Umbraco.Cdn.Core.Extensions;

public static class StatusExtensions
{
    public static Status Merge(this IEnumerable<Status> statuses)
    {
        var status = new Status()
        {
            Success = false
        };
        if (statuses.All(x => x.Success))
        {
            status.Success = true;
            return status;
        }


        foreach (var subStatus in statuses.Where(x => !x.Success))
        {
            status.Errors.AddRange(subStatus.Errors);
        }

        return status;
    }
}