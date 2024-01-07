import '@umbraco-ui/uui-button';
import '@umbraco-ui/uui-select';
import '@umbraco-ui/uui-loader-bar';
import { PropType } from 'vue';
import { Status } from "../Services/umbraco/generated/api.generated.clients";
declare const _default: import("vue").DefineComponent<{
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    nodeId: {
        type: NumberConstructor;
        default: number;
    };
    message: StringConstructor;
    providers: {
        type: PropType<Option[]>;
        default: () => Option[];
    };
    currentDomains: {
        type: PropType<Option[]>;
        default: () => Option[];
    };
    domains: {
        type: PropType<Option[]>;
        default: () => Option[];
    };
}, void, {
    loading: boolean;
    message: string;
    providers: any[];
    currentDomain: string;
    currentProvider: string;
}, {}, {
    selectProvider(object: any): Promise<void>;
    selectDomain(object: any): Promise<void>;
    sendData(): Promise<void>;
    fetchData(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    refrehsnodesubmit: (result: Status) => true;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    nodeId: {
        type: NumberConstructor;
        default: number;
    };
    message: StringConstructor;
    providers: {
        type: PropType<Option[]>;
        default: () => Option[];
    };
    currentDomains: {
        type: PropType<Option[]>;
        default: () => Option[];
    };
    domains: {
        type: PropType<Option[]>;
        default: () => Option[];
    };
}>> & {
    onRefrehsnodesubmit?: (result: Status) => any;
}, {
    providers: Option[];
    loading: boolean;
    nodeId: number;
    currentDomains: Option[];
    domains: Option[];
}, {}>;
export default _default;
