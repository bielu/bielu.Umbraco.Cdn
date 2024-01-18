# Akamai

This provider is based on Akamai CDN. It is using Akamai Open API to refresh cache. Please refere to [Akamai Open API documentation](https://techdocs.akamai.com/purge-cache/reference) for more information.

## Configuration
### Json Options Schema
```json
```
{src="../../src/bielu.Umbraco.Cdn.Akamai/schema/appsettings-schema.AkamaiOptions.json" }

### BaseUrl
This is a base url for Akamai account. It is required to be able to use Akamai.
### Network
This is a network for Akamai account. It is required to be able to use Akamai. Default value is production.
### SupportedHosts
Akamai has no concept of hostnames. So we need store them in configuration. Default value is empty list.
### SwitchKey
This is a switch key for Akamai account. It is required to be able to use Akamai.
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
                .AddAkamaiCdnProvider()
```