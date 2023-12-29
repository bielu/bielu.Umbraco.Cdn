# Cloudflare

Start typing here...

## Configuration
### Json Options Schema
```json
```
{src="../../src/bielu.Umbraco.Cdn.Cloudflare/schema/appsettings-schema.CloudflareOptions.json" }
#### AuthenticationType
This is an authentication type for Cloudflare account. It is required to be able to use Cloudflare. Default value is GlobalApiKey.
#### ApiKey
This is an API key for Cloudflare account. It is required to be able to use Cloudflare, if AuthenticationType is set to GlobalApiKey.
#### Email
This is an email for Cloudflare account. It is required to be able to use Cloudflare, if AuthenticationType is set to GlobalApiKey.
#### Token
This is a token for Cloudflare account. It is required to be able to use Cloudflare, if AuthenticationType is set to BearerToken.
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
                .AddCloudflareCdnProvider()
```