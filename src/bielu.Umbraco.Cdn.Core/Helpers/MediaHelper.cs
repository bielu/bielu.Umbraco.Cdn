using System.Collections.Generic;
using System.Text.Json;
using Newtonsoft.Json;
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
                var imageProperty = image.Properties.TryGetValue("umbracoFile",  out var property);
                var imageCropper = JsonConvert.DeserializeObject<ImageCropperValue>(property.GetValue().ToString())   ;
                cropUrls.Add("none",imageCropper.Src);
                if(imageCropper.Crops!= null){
                foreach (var crop in imageCropper.Crops)
                {
                    
                    //Get the cropped URL and add it to the dictionary that I will return
                    cropUrls.Add(crop.Alias, imageCropper.GetCropUrl(crop.Alias, urlGenerator,true, true,null));
                }
                }
            }

            return cropUrls;
        }
    }
}