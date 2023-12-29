using Amazon.CloudFront;
using bielu.Umbraco.Cdn.Aws.Configuration;
using bielu.Umbraco.Cdn.Aws.Models;
using Microsoft.Extensions.Options;

namespace bielu.Umbraco.Cdn.Aws.Services;
public class AmazonCloudFrontClientFactory : IAmazonCloudFrontClientFactory
{
    private readonly IOptionsMonitor<CloudFrontOptions> _frontDoorOptions;

    public AmazonCloudFrontClientFactory( IOptionsMonitor<CloudFrontOptions> frontDoorOptions)
    {
        _frontDoorOptions = frontDoorOptions;
    }


    public AmazonCloudFrontClient GetCloudFrontClient()
    {
        return new AmazonCloudFrontClient(_frontDoorOptions.CurrentValue.AccessKey,
            _frontDoorOptions.CurrentValue.SecretKey, _frontDoorOptions.CurrentValue.Region);
    }
}