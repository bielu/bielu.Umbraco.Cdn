# AWS Cloud Front

Start typing here...
## Configuration
### Json Options Schema
```json
```
{src="../../src/bielu.Umbraco.Cdn.Aws.CloudFront/schema/appsettings-schema.CloudFrontOptions.json" }


#### SecretKey
This is a secret key for AWS account. It is required to be able to use AWS Cloud Front. 
#### AccessKey
This is an access key for AWS account. It is required to be able to use AWS Cloud Front.
#### Disabled
This flag is responsible by enabling / disabling provider. Default value is false.
#### Region
This is a region where AWS Cloud Front is hosted. Default value is eu-west-1.
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
        .AddAwsCloudFrontCdnProvider()
```