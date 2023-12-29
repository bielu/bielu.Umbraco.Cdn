﻿using System.Collections.Generic;
using bielu.Umbraco.Cdn.Models;

namespace bielu.Umbraco.Cdn.Cloudflare.Models;

public class CloudflareZoneResponse
{
    public List<Zone> Result { get; set; }
    public bool Success{ get; set; }
    public List<Errors>  Errors{ get; set; }
}