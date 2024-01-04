# Azure
## Shared Configuration
### Json Options Schema
```json
```
{src="../../src/bielu.Umbraco.Cdn.Azure.Common/schema/appsettings-schema.AzureBaseOptions.json" }


#### AuthenticationType
This is an authentication type for Azure Front Door account. It is required to be able to use Azure Front Door.
#### ResourceGroupName
This is a resource group name for Azure Front Door account. It is required to be able to use Azure Front Door.
#### SubscriptionId
This is a subscription id for Azure Front Door account. It is required to be able to use Azure Front Door.
#### UserAssignedClientId
This is a user assigned client id for Azure Front Door account. It is required to be able to use Azure Front Door.

## Azure Provider Matrix
| Cdn                                | FrontDoor Provider | Cdn Provider                                         |
|------------------------------------| ------------- |------------------------------------------------------|
| Azure Front Door                   | ![heavy_check_mark.svg](../img/heavy_check_mark.svg)  | x                                                    |
| Azure Front Door Classic / Premium | x  | ![heavy_check_mark.svg](../img/heavy_check_mark.svg) |
| Azure Cdn                          | x  | x*                                                   |
\* - Azure Cdn provider (by this I mean any other cdn in azure than Front Door) is not supported by this package. It might work, but it is not tested. 