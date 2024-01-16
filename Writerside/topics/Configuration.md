# Configuration
This section of documentation is dedicated to configuration of providers. Each provider has it's own configuration options and this section will only shared configuration options between all providers.
## Configuration
### Json Options Schema
```json
```
{src="../../src/bielu.Umbraco.Cdn.Core/schema/appsettings-schema.bielucdnoptions.json" }

#### Auditing Flag
This flag is responsible by enabling / disabling adding logs to Umbraco Audit log. Default value is true.
#### Preview Flag
This flag is responsible by enabling / disabling refreshment of preview in cases when CDN is enabled on preview Urls(not recommended). Default value is false.
#### ReferencePurge
This flag is responsible by enabling / disabling refreshment of content referencing current page(not recommended). Default value is false. This is not recommended as it can cause performance issues.
#### Development Mode Flag
This flag is responsible by enabling / disabling development mode for provider and should be use only when working with changes in UI as allows to bootstrap Vite compiler and do live reloads. Default value is false.

## Umbraco Configuration
When using provider, it is highly recommend to use Culture and hostnames for each language.  If you don't have hostnames for each language, languages will be send to provider based on umbraco url(https://github.com/umbraco/Umbraco-CMS/blob/2e61d6449ae8e0c837dafa1e93ac950eda36c4f2/src/Umbraco.Web.Common/AspNetCore/AspNetCoreRequestAccessor.cs#L68) and this will cause issues in load balancing scenarios.
