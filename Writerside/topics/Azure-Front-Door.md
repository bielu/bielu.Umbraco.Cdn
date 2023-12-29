# Azure Front Door

Start typing here...
## Configuration
### Json Options Schema
```json
```
{src="../../src/bielu.Umbraco.Cdn.Azure.FrontDoor/schema/appsettings-schema.FrontDoorOptions.json" }

#### AuthenticationType
This is an authentication type for Azure Front Door account. It is required to be able to use Azure Front Door.
#### ResourceGroupName
This is a resource group name for Azure Front Door account. It is required to be able to use Azure Front Door.
#### SubscriptionId
This is a subscription id for Azure Front Door account. It is required to be able to use Azure Front Door.
#### UserAssignedClientId
This is a user assigned client id for Azure Front Door account. It is required to be able to use Azure Front Door.
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