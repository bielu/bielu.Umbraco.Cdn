# Azure Classic Front Door

Start typing here...
## Configuration
### Json Options Schema
```json
```
{src="../../src/bielu.Umbraco.Cdn.Azure.Cdn/schema/appsettings-schema.AzureCdnOptions.json" }

## Installing Provider
In order to activate provider post installation, you need to add following code to your Startup.cs or Program.cs (for minimal hosting model) file.

In registration of services, after this lines:
```C#
services.AddUmbraco(_env, _config)
                .AddBackOffice()
                .AddWebsite()
                .AddComposers()
```
You need to add following line:
```C#
        .
                .AddAzureFrontDoorCdnProvider()
```