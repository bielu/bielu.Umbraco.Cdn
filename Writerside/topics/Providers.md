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

## Providers

| CDN Provider        | Version | Written | Packaged |
|---------------------|---------|---------|----------|
| Cloudflare          | 2.0.0   | yes     | yes      |
| Azure Front Door    | 2.0.0   | yes      | yes      |
| AWS Front Cloud     | 2.0.0   | yes      | yes      |
| Nginx Reverse proxy | 2.0.0   | yes     | yes      |
| Akamai              | 2.0.0   | no      | yes      |