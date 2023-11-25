using System.Collections.Generic;

namespace bielu.Umbraco.Cdn.Models;

public class Provider
{
    public string Id { get; set; }
    public string Name { get; set; }
    public IList<string> SupportedHostnames { get; set; }
    public int NodeId { get; set; }
}