# Providers

Overview articles give background information and provide context to a particular subject.
Their goal is to explain a concept, not to teach or give instructions.

## What is product/service/concept

Provide some background and context, explain choices and alternatives.

## Shared Configuration

This is a configuration that is shared between all providers. It is required to be able to use any of providers.

## Configuration

### Json Options Schema

```json
```

{src="../../src/bielu.Umbraco.Cdn.Core/schema/appsettings-schema.ConfigurationBaseOptions.json" }

#### Disabled

This flag is responsible by enabling / disabling provider. Default value is false.

## Feature Matrix Providers

| Provider | Purge By Hostname | Purge By Url | Purge All | Purge By Path  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Akamai | ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |  ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |  ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |  ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |
| Azure Front Door | ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |  ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |  ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |  ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |
| AWS CloudFront | ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |  ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |  ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |  ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |
| Cloudflare | ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |  ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |  ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |  ![heavy_check_mark.svg](../img/heavy_check_mark.svg)* |
\* - Purge by path is support by cloudflare in Enterprise plan only. So we work around it by getting all possible descandants of given path and purge them. It is not ideal, but it works.


