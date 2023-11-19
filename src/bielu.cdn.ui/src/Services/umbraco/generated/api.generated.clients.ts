//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.20.0.0 (NJsonSchema v10.9.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import * as moment from 'moment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IApiClient {
    bieluCdnManagment(id: string): Observable<Status>;
}

@Injectable()
export class ApiClient implements IApiClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    bieluCdnManagment(id: string): Observable<Status> {
        let url_ = this.baseUrl + "/cdn/api/BieluCdnManagment?";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined and cannot be null.");
        else
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processBieluCdnManagment(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processBieluCdnManagment(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<Status>;
                }
            } else
                return _observableThrow(response_) as any as Observable<Status>;
        }));
    }

    protected processBieluCdnManagment(response: HttpResponseBase): Observable<Status> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        let _mappings: { source: any, target: any }[] = [];
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : jsonParse(_responseText, this.jsonParseReviver);
            result200 = Status.fromJS(resultData200, _mappings);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<Status>(null as any);
    }
}

export class Status implements IStatus {
    success!: boolean;
    message!: string | undefined;
    details!: string | undefined;
    errors!: Errors[] | undefined;
    exception!: Exception | undefined;
    messageType!: EventMessageType;

    constructor(data?: IStatus) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any, _mappings?: any) {
        if (_data) {
            this.success = _data["success"];
            this.message = _data["message"];
            this.details = _data["details"];
            if (Array.isArray(_data["errors"])) {
                this.errors = [] as any;
                for (let item of _data["errors"])
                    this.errors!.push(Errors.fromJS(item, _mappings));
            }
            this.exception = _data["exception"] ? Exception.fromJS(_data["exception"], _mappings) : <any>undefined;
            this.messageType = _data["messageType"];
        }
    }

    static fromJS(data: any, _mappings?: any): Status | null {
        data = typeof data === 'object' ? data : {};
        return createInstance<Status>(data, _mappings, Status);
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["success"] = this.success;
        data["message"] = this.message;
        data["details"] = this.details;
        if (Array.isArray(this.errors)) {
            data["errors"] = [];
            for (let item of this.errors)
                data["errors"].push(item.toJSON());
        }
        data["exception"] = this.exception ? this.exception.toJSON() : <any>undefined;
        data["messageType"] = this.messageType;
        return data;
    }
}

export interface IStatus {
    success: boolean;
    message: string | undefined;
    details: string | undefined;
    errors: Errors[] | undefined;
    exception: Exception | undefined;
    messageType: EventMessageType;
}

export class Errors implements IErrors {
    code!: number;
    message!: string | undefined;

    constructor(data?: IErrors) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any, _mappings?: any) {
        if (_data) {
            this.code = _data["code"];
            this.message = _data["message"];
        }
    }

    static fromJS(data: any, _mappings?: any): Errors | null {
        data = typeof data === 'object' ? data : {};
        return createInstance<Errors>(data, _mappings, Errors);
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["code"] = this.code;
        data["message"] = this.message;
        return data;
    }
}

export interface IErrors {
    code: number;
    message: string | undefined;
}

export class Exception implements IException {
    message!: string;
    innerException!: Exception | undefined;
    source!: string | undefined;
    stackTrace!: string | undefined;

    constructor(data?: IException) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any, _mappings?: any) {
        if (_data) {
            this.message = _data["Message"];
            this.innerException = _data["InnerException"] ? Exception.fromJS(_data["InnerException"], _mappings) : <any>undefined;
            this.source = _data["Source"];
            this.stackTrace = _data["StackTrace"];
        }
    }

    static fromJS(data: any, _mappings?: any): Exception | null {
        data = typeof data === 'object' ? data : {};
        return createInstance<Exception>(data, _mappings, Exception);
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Message"] = this.message;
        data["InnerException"] = this.innerException ? this.innerException.toJSON() : <any>undefined;
        data["Source"] = this.source;
        data["StackTrace"] = this.stackTrace;
        return data;
    }
}

export interface IException {
    message: string;
    innerException: Exception | undefined;
    source: string | undefined;
    stackTrace: string | undefined;
}

export enum EventMessageType {
    Default = 0,
    Info = 1,
    Error = 2,
    Success = 3,
    Warning = 4,
}

function jsonParse(json: any, reviver?: any) {
    json = JSON.parse(json, reviver);

    var byid: any = {};
    var refs: any = [];
    json = (function recurse(obj: any, prop?: any, parent?: any) {
        if (typeof obj !== 'object' || !obj)
            return obj;
        
        if ("$ref" in obj) {
            let ref = obj.$ref;
            if (ref in byid)
                return byid[ref];
            refs.push([parent, prop, ref]);
            return undefined;
        } else if ("$id" in obj) {
            let id = obj.$id;
            delete obj.$id;
            if ("$values" in obj)
                obj = obj.$values;
            byid[id] = obj;
        }
        
        if (Array.isArray(obj)) {
            obj = obj.map((v, i) => recurse(v, i, obj));
        } else {
            for (var p in obj) {
                if (obj.hasOwnProperty(p) && obj[p] && typeof obj[p] === 'object')
                    obj[p] = recurse(obj[p], p, obj);
            }
        }

        return obj;
    })(json);

    for (let i = 0; i < refs.length; i++) {
        const ref = refs[i];
        ref[0][ref[1]] = byid[ref[2]];
    }

    return json;
}

function createInstance<T>(data: any, mappings: any, type: any): T | null {
  if (!mappings)
    mappings = [];
  if (!data)
    return null;

  const mappingIndexName = "__mappingIndex";
  if (data[mappingIndexName])
    return <T>mappings[data[mappingIndexName]].target;

  data[mappingIndexName] = mappings.length;

  let result: any = new type();
  mappings.push({ source: data, target: result });
  result.init(data, mappings);
  return result;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}