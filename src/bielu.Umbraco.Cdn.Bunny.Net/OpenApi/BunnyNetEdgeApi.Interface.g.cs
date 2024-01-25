//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.0.2.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

#pragma warning disable 108 // Disable "CS0108 '{derivedDto}.ToJson()' hides inherited member '{dtoBase}.ToJson()'. Use the new keyword if hiding was intended."
#pragma warning disable 114 // Disable "CS0114 '{derivedDto}.RaisePropertyChanged(String)' hides inherited member 'dtoBase.RaisePropertyChanged(String)'. To make the current member override that implementation, add the override keyword. Otherwise add the new keyword."
#pragma warning disable 472 // Disable "CS0472 The result of the expression is always 'false' since a value of type 'Int32' is never equal to 'null' of type 'Int32?'
#pragma warning disable 612 // Disable "CS0612 '...' is obsolete"
#pragma warning disable 1573 // Disable "CS1573 Parameter '...' has no matching param tag in the XML comment for ...
#pragma warning disable 1591 // Disable "CS1591 Missing XML comment for publicly visible type or member ..."
#pragma warning disable 8073 // Disable "CS8073 The result of the expression is always 'false' since a value of type 'T' is never equal to 'null' of type 'T?'"
#pragma warning disable 3016 // Disable "CS3016 Arrays as attribute arguments is not CLS-compliant"
#pragma warning disable 8603 // Disable "CS8603 Possible null reference return"
#pragma warning disable 8604 // Disable "CS8604 Possible null reference argument for parameter"
#pragma warning disable 8625 // Disable "CS8625 Cannot convert null literal to non-nullable reference type"

namespace bielu.Umbraco.Cdn.Bunny.Net.CCU.Interface
{
    using System = global::System;

    [System.CodeDom.Compiler.GeneratedCode("NSwag", "14.0.2.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0))")]
    public partial interface IBunnyNetEdgeApiClient
    {
        /// <summary>
        /// Download File
        /// </summary>
        /// <remarks>
        /// Returns the stored file at the given path. If the file does not exist, a 404 response will be returned.
        /// </remarks>
        /// <param name="storageZoneName">The name of your storage zone where you are connecting to.</param>
        /// <param name="path">The directory path to your file. If this is the root of your storage zone, you can ignore this parameter.</param>
        /// <param name="fileName">The name of the file that you wish to download.</param>
        /// <param name="accessKey">The API AccessKey used for authentication.</param>
        /// <returns>Returns the file stored at the given path.</returns>
        /// <exception cref="BunnyNetEdgeApiApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task AnonymousGETAsync(string storageZoneName, string path, string fileName, string accessKey);

        /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <summary>
        /// Download File
        /// </summary>
        /// <remarks>
        /// Returns the stored file at the given path. If the file does not exist, a 404 response will be returned.
        /// </remarks>
        /// <param name="storageZoneName">The name of your storage zone where you are connecting to.</param>
        /// <param name="path">The directory path to your file. If this is the root of your storage zone, you can ignore this parameter.</param>
        /// <param name="fileName">The name of the file that you wish to download.</param>
        /// <param name="accessKey">The API AccessKey used for authentication.</param>
        /// <returns>Returns the file stored at the given path.</returns>
        /// <exception cref="BunnyNetEdgeApiApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task AnonymousGETAsync(string storageZoneName, string path, string fileName, string accessKey, System.Threading.CancellationToken cancellationToken);

        /// <summary>
        /// Upload File
        /// </summary>
        /// <remarks>
        /// Upload a file to a storage zone based on the URL path. If the directory tree does not exist, it will be created automatically. **The file content should be sent as the body of the request without any type of encoding.**
        /// </remarks>
        /// <param name="body">Raw request body should contain the contents of the file. This should be raw file data without any sort of encoding.</param>
        /// <param name="storageZoneName">he name of your storage zone where you are connecting to.</param>
        /// <param name="path">The directory path to where your file will be stored. If this is the root of your storage zone, you can ignore this parameter.</param>
        /// <param name="fileName">The name that the file will be uploaded as.</param>
        /// <param name="checksum">The SHA256 checksum of the uploaded content. The server will compare the final SHA256 to the checksum and reject the request in case the checksums do not match.</param>
        /// <param name="accessKey">The API AccessKey used for authentication.</param>
        /// <returns>The file upload was successful.</returns>
        /// <exception cref="BunnyNetEdgeApiApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task AnonymousPUTAsync(System.IO.Stream body, string storageZoneName, string path, string fileName, string checksum, string accessKey);

        /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <summary>
        /// Upload File
        /// </summary>
        /// <remarks>
        /// Upload a file to a storage zone based on the URL path. If the directory tree does not exist, it will be created automatically. **The file content should be sent as the body of the request without any type of encoding.**
        /// </remarks>
        /// <param name="body">Raw request body should contain the contents of the file. This should be raw file data without any sort of encoding.</param>
        /// <param name="storageZoneName">he name of your storage zone where you are connecting to.</param>
        /// <param name="path">The directory path to where your file will be stored. If this is the root of your storage zone, you can ignore this parameter.</param>
        /// <param name="fileName">The name that the file will be uploaded as.</param>
        /// <param name="checksum">The SHA256 checksum of the uploaded content. The server will compare the final SHA256 to the checksum and reject the request in case the checksums do not match.</param>
        /// <param name="accessKey">The API AccessKey used for authentication.</param>
        /// <returns>The file upload was successful.</returns>
        /// <exception cref="BunnyNetEdgeApiApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task AnonymousPUTAsync(System.IO.Stream body, string storageZoneName, string path, string fileName, string checksum, string accessKey, System.Threading.CancellationToken cancellationToken);

        /// <summary>
        /// Delete File
        /// </summary>
        /// <remarks>
        /// Delete an object from the storage zone. In case the object is a directory all the data in it will be recursively deleted as well.
        /// </remarks>
        /// <param name="storageZoneName">The name of your storage zone where you are connecting to.</param>
        /// <param name="path">The directory path to your file. If this is the root of your storage zone, you can ignore this parameter.</param>
        /// <param name="fileName">The name of the file that you wish to delete.</param>
        /// <param name="accessKey">The API AccessKey used for authentication.</param>
        /// <returns>Object was successfully deleted</returns>
        /// <exception cref="BunnyNetEdgeApiApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task AnonymousDELETEAsync(string storageZoneName, string path, string fileName, string accessKey);

        /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <summary>
        /// Delete File
        /// </summary>
        /// <remarks>
        /// Delete an object from the storage zone. In case the object is a directory all the data in it will be recursively deleted as well.
        /// </remarks>
        /// <param name="storageZoneName">The name of your storage zone where you are connecting to.</param>
        /// <param name="path">The directory path to your file. If this is the root of your storage zone, you can ignore this parameter.</param>
        /// <param name="fileName">The name of the file that you wish to delete.</param>
        /// <param name="accessKey">The API AccessKey used for authentication.</param>
        /// <returns>Object was successfully deleted</returns>
        /// <exception cref="BunnyNetEdgeApiApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task AnonymousDELETEAsync(string storageZoneName, string path, string fileName, string accessKey, System.Threading.CancellationToken cancellationToken);

        /// <summary>
        /// List Files
        /// </summary>
        /// <remarks>
        /// Retrieve a list of files and directories located in the given directory.
        /// </remarks>
        /// <param name="storageZoneName">he name of your storage zone where you are connecting to.</param>
        /// <param name="path">The directory path that you want to list.</param>
        /// <returns>A JSON encoded array of objects.</returns>
        /// <exception cref="BunnyNetEdgeApiApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task<System.Collections.Generic.ICollection<StorageObject>> AnonymousAllAsync(string storageZoneName, string path);

        /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <summary>
        /// List Files
        /// </summary>
        /// <remarks>
        /// Retrieve a list of files and directories located in the given directory.
        /// </remarks>
        /// <param name="storageZoneName">he name of your storage zone where you are connecting to.</param>
        /// <param name="path">The directory path that you want to list.</param>
        /// <returns>A JSON encoded array of objects.</returns>
        /// <exception cref="BunnyNetEdgeApiApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task<System.Collections.Generic.ICollection<StorageObject>> AnonymousAllAsync(string storageZoneName, string path, System.Threading.CancellationToken cancellationToken);

    }

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "14.0.2.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0))")]
    public partial class ErrorObject
    {
        /// <summary>
        /// The error status code of the request
        /// </summary>
        [Newtonsoft.Json.JsonProperty("HttpCode", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public int HttpCode { get; set; }

        /// <summary>
        /// The error description message
        /// </summary>
        [Newtonsoft.Json.JsonProperty("Message", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string Message { get; set; }

        private System.Collections.Generic.IDictionary<string, object> _additionalProperties;

        [Newtonsoft.Json.JsonExtensionData]
        public System.Collections.Generic.IDictionary<string, object> AdditionalProperties
        {
            get { return _additionalProperties ?? (_additionalProperties = new System.Collections.Generic.Dictionary<string, object>()); }
            set { _additionalProperties = value; }
        }

    }

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "14.0.2.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0))")]
    public partial class StorageObject
    {
        /// <summary>
        /// The unique Guid that represents the file
        /// </summary>
        [Newtonsoft.Json.JsonProperty("Guid", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public System.Guid Guid { get; set; }

        /// <summary>
        /// The full hostname domain value
        /// </summary>
        [Newtonsoft.Json.JsonProperty("StorageZoneName", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string StorageZoneName { get; set; }

        /// <summary>
        /// True directory path where the object is located
        /// </summary>
        [Newtonsoft.Json.JsonProperty("Path", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string Path { get; set; }

        /// <summary>
        /// The name of the object, file or directory name
        /// </summary>
        [Newtonsoft.Json.JsonProperty("ObjectName", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string ObjectName { get; set; }

        /// <summary>
        /// The size of the file
        /// </summary>
        [Newtonsoft.Json.JsonProperty("Length", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public long Length { get; set; }

        /// <summary>
        /// The time when the file was last changed
        /// </summary>
        [Newtonsoft.Json.JsonProperty("LastChanged", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string LastChanged { get; set; }

        /// <summary>
        /// True if this is a directory object, false if it's a file
        /// </summary>
        [Newtonsoft.Json.JsonProperty("IsDirectory", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public bool IsDirectory { get; set; }

        /// <summary>
        /// The ID of the physical server that holds the file
        /// </summary>
        [Newtonsoft.Json.JsonProperty("ServerId", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public int ServerId { get; set; }

        /// <summary>
        /// The ID of the user that holds the file
        /// </summary>
        [Newtonsoft.Json.JsonProperty("UserId", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string UserId { get; set; }

        /// <summary>
        /// The date and time when the object was first created
        /// </summary>
        [Newtonsoft.Json.JsonProperty("DateCreated", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string DateCreated { get; set; }

        /// <summary>
        /// The storage zone ID to which the file belongs
        /// </summary>
        [Newtonsoft.Json.JsonProperty("StorageZoneId", Required = Newtonsoft.Json.Required.DisallowNull, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public int StorageZoneId { get; set; }

        private System.Collections.Generic.IDictionary<string, object> _additionalProperties;

        [Newtonsoft.Json.JsonExtensionData]
        public System.Collections.Generic.IDictionary<string, object> AdditionalProperties
        {
            get { return _additionalProperties ?? (_additionalProperties = new System.Collections.Generic.Dictionary<string, object>()); }
            set { _additionalProperties = value; }
        }

    }

    [System.CodeDom.Compiler.GeneratedCode("NSwag", "14.0.2.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0))")]
    public partial class FileParameter
    {
        public FileParameter(System.IO.Stream data)
            : this (data, null, null)
        {
        }

        public FileParameter(System.IO.Stream data, string fileName)
            : this (data, fileName, null)
        {
        }

        public FileParameter(System.IO.Stream data, string fileName, string contentType)
        {
            Data = data;
            FileName = fileName;
            ContentType = contentType;
        }

        public System.IO.Stream Data { get; private set; }

        public string FileName { get; private set; }

        public string ContentType { get; private set; }
    }



    [System.CodeDom.Compiler.GeneratedCode("NSwag", "14.0.2.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0))")]
    public partial class BunnyNetEdgeApiApiException : System.Exception
    {
        public int StatusCode { get; private set; }

        public string Response { get; private set; }

        public System.Collections.Generic.IReadOnlyDictionary<string, System.Collections.Generic.IEnumerable<string>> Headers { get; private set; }

        public BunnyNetEdgeApiApiException(string message, int statusCode, string response, System.Collections.Generic.IReadOnlyDictionary<string, System.Collections.Generic.IEnumerable<string>> headers, System.Exception innerException)
            : base(message + "\n\nStatus: " + statusCode + "\nResponse: \n" + ((response == null) ? "(null)" : response.Substring(0, response.Length >= 512 ? 512 : response.Length)), innerException)
        {
            StatusCode = statusCode;
            Response = response;
            Headers = headers;
        }

        public override string ToString()
        {
            return string.Format("HTTP Response: \n\n{0}\n\n{1}", Response, base.ToString());
        }
    }

    [System.CodeDom.Compiler.GeneratedCode("NSwag", "14.0.2.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0))")]
    public partial class BunnyNetEdgeApiApiException<TResult> : BunnyNetEdgeApiApiException
    {
        public TResult Result { get; private set; }

        public BunnyNetEdgeApiApiException(string message, int statusCode, string response, System.Collections.Generic.IReadOnlyDictionary<string, System.Collections.Generic.IEnumerable<string>> headers, TResult result, System.Exception innerException)
            : base(message, statusCode, response, headers, innerException)
        {
            Result = result;
        }
    }

}

#pragma warning restore  108
#pragma warning restore  114
#pragma warning restore  472
#pragma warning restore  612
#pragma warning restore 1573
#pragma warning restore 1591
#pragma warning restore 8073
#pragma warning restore 3016
#pragma warning restore 8603
#pragma warning restore 8604
#pragma warning restore 8625