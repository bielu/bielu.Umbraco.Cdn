import * as moment from 'moment';
export interface IManagementClient {
    getAuditHistory(): Promise<AuditRecord[] | null>;
    getProviders(id?: number | undefined): Promise<Provider[] | null>;
    refreshForNode(id: number, providerId?: string | undefined, domain?: string | undefined): Promise<Status | null>;
}
export declare class ManagementClient implements IManagementClient {
    private http;
    private baseUrl;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined;
    constructor(baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    });
    getAuditHistory(): Promise<AuditRecord[] | null>;
    protected processGetAuditHistory(response: Response): Promise<AuditRecord[] | null>;
    getProviders(id?: number | undefined): Promise<Provider[] | null>;
    protected processGetProviders(response: Response): Promise<Provider[] | null>;
    refreshForNode(id: number, providerId?: string | undefined, domain?: string | undefined): Promise<Status | null>;
    protected processRefreshForNode(response: Response): Promise<Status | null>;
}
export declare class AuditRecord implements IAuditRecord {
    name: string | null;
    date: moment.Moment;
    message: string | null;
    details: string | null;
    username: string | null;
    constructor(data?: IAuditRecord);
    init(_data?: any, _mappings?: any): void;
    static fromJS(data: any, _mappings?: any): AuditRecord | null;
    toJSON(data?: any): any;
}
export interface IAuditRecord {
    name: string | null;
    date: moment.Moment;
    message: string | null;
    details: string | null;
    username: string | null;
}
export declare class Provider implements IProvider {
    enabled: boolean;
    id: string | null;
    name: string | null;
    supportedHostnames: string[] | null;
    version: string;
    constructor(data?: IProvider);
    init(_data?: any, _mappings?: any): void;
    static fromJS(data: any, _mappings?: any): Provider | null;
    toJSON(data?: any): any;
}
export interface IProvider {
    enabled: boolean;
    id: string | null;
    name: string | null;
    supportedHostnames: string[] | null;
    version: string;
}
export declare class Status implements IStatus {
    success: boolean;
    message: string | null;
    details: string | null;
    errors: Errors[] | null;
    exception: Exception | null;
    messageType: EventMessageType | null;
    constructor(data?: IStatus);
    init(_data?: any, _mappings?: any): void;
    static fromJS(data: any, _mappings?: any): Status | null;
    toJSON(data?: any): any;
}
export interface IStatus {
    success: boolean;
    message: string | null;
    details: string | null;
    errors: Errors[] | null;
    exception: Exception | null;
    messageType: EventMessageType | null;
}
export declare class Errors implements IErrors {
    code: number;
    message: string | null;
    constructor(data?: IErrors);
    init(_data?: any, _mappings?: any): void;
    static fromJS(data: any, _mappings?: any): Errors | null;
    toJSON(data?: any): any;
}
export interface IErrors {
    code: number;
    message: string | null;
}
export declare class Exception implements IException {
    message: string;
    innerException: Exception | null;
    source: string | null;
    stackTrace: string | null;
    constructor(data?: IException);
    init(_data?: any, _mappings?: any): void;
    static fromJS(data: any, _mappings?: any): Exception | null;
    toJSON(data?: any): any;
}
export interface IException {
    message: string;
    innerException: Exception | null;
    source: string | null;
    stackTrace: string | null;
}
export declare enum EventMessageType {
    Default = 0,
    Info = 1,
    Error = 2,
    Success = 3,
    Warning = 4
}
export declare class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: {
        [key: string]: any;
    };
    result: any;
    constructor(message: string, status: number, response: string, headers: {
        [key: string]: any;
    }, result: any);
    protected isApiException: boolean;
    static isApiException(obj: any): obj is ApiException;
}
