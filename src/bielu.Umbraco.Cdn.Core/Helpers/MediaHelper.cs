using System;
using System.Collections.Generic;
using System.Text.Json;
using Newtonsoft.Json;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Media;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors.ValueConverters;
using Umbraco.Extensions;

namespace bielu.Umbraco.Cdn.Core.Helpers
{
    public static class MediaHelper
    {
        public static Dictionary<string, string> GetCropUrls(this IMedia image, IImageUrlGenerator urlGenerator)
        {
            //Instantiate the dictionary that I will return with "Crop alias" and "Cropped URL"
            Dictionary<string, string> cropUrls = new Dictionary<string, string>();

            if (image.Properties.Contains("umbracoFile"))
            {
                var imageProperty = image.Properties.TryGetValue("umbracoFile", out var property);
                var propertyValue = property.GetValue().ToString();
                switch (image.ContentType.Alias)
                {
                    case Constants.Conventions.MediaTypes.Image:
                        var imageCropper = JsonConvert.DeserializeObject<ImageCropperValue>(propertyValue);
                        cropUrls.Add("none", imageCropper.Src);
                        if (imageCropper.Crops != null)
                        {
                            foreach (var crop in imageCropper.Crops)
                            {
                                //Get the cropped URL and add it to the dictionary that I will return
                                cropUrls.Add(crop.Alias,
                                    imageCropper.GetCropUrl(crop.Alias, urlGenerator, true, true, null));
                            }
                        }

                        break;
                    case Constants.Conventions.MediaTypes.VectorGraphicsAlias:
                    case Constants.Conventions.MediaTypes.ArticleAlias:
                    case Constants.Conventions.MediaTypes.File:
                    case Constants.Conventions.MediaTypes.VideoAlias:
                    case Constants.Conventions.MediaTypes.AudioAlias:
                    default:
                        cropUrls.Add("none", propertyValue);
                        break;
                }
            }

            return cropUrls;
        }
    }
}