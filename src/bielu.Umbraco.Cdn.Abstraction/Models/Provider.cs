using System.Collections.Generic;

namespace bielu.Umbraco.Cdn.Models;

public class Provider
{
    public bool Enabled { get; set; }
    public string? Id { get; set; }
    public string? Name { get; set; }
    public IList<string>? SupportedHostnames { get; set; }
    public string Version { get; set; }
}