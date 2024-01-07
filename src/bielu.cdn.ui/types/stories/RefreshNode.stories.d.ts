import type { StoryObj } from '@storybook/vue3';
import RefreshNode from "../components/RefreshNode.vue";
declare const meta: {
    title: string;
    component: import("vue").DefineComponent<{
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
            type: import("vue").PropType<Option[]>;
            default: () => Option[];
        };
        currentDomains: {
            type: import("vue").PropType<Option[]>;
            default: () => Option[];
        };
        domains: {
            type: import("vue").PropType<Option[]>;
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
        refrehsnodesubmit: (result: import("../Services/umbraco/generated/api.generated.clients").Status) => true;
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
            type: import("vue").PropType<Option[]>;
            default: () => Option[];
        };
        currentDomains: {
            type: import("vue").PropType<Option[]>;
            default: () => Option[];
        };
        domains: {
            type: import("vue").PropType<Option[]>;
            default: () => Option[];
        };
    }>> & {
        onRefrehsnodesubmit?: (result: import("../Services/umbraco/generated/api.generated.clients").Status) => any;
    }, {
        providers: Option[];
        loading: boolean;
        nodeId: number;
        currentDomains: Option[];
        domains: Option[];
    }, {}>;
};
export default meta;
type Story = StoryObj<typeof RefreshNode>;
export declare const Primary: Story;
