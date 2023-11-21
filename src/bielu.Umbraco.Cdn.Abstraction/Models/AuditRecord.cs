using System;

namespace bielu.Umbraco.Cdn.Models;

public class AuditRecord
{
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public string Message { get; set; }
    public string Details { get; set; }
    public string Username { get; set; }
}