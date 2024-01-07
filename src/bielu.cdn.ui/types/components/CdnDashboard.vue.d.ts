import '@umbraco-ui/uui-button';
import '@umbraco-ui/uui-select';
import '@umbraco-ui/uui-loader-bar';
import { Provider } from "../Services/umbraco/generated/api.generated.clients";
import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    message: StringConstructor;
    providers: {
        type: PropType<Provider[]>;
        required: true;
    };
}, void, {
    loading: boolean;
    message: string;
    providers: Provider[];
    currentDomain: string;
    currentProvider: string;
}, {}, {
    refreshAllProviders(): Promise<void>;
    refreshProvider(provider: Provider): Promise<void>;
    refreshDomain(domain: string): Promise<void>;
    fetchData(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    message: StringConstructor;
    providers: {
        type: PropType<Provider[]>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
