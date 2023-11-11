using Amazon.CloudFront;

namespace bielu.Umbraco.Cdn.Aws.Services;

public interface IAmazonCloudFrontClientFactory
{
    public AmazonCloudFrontClient  GetCloudFrontClient();
}