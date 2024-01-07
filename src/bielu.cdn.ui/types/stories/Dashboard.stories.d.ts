import type { StoryObj } from '@storybook/vue3';
declare const meta: {
    title: string;
    component: import("vue").DefineComponent<{
        message: StringConstructor;
        providers: {
            type: import("vue").PropType<import("../Services/umbraco/generated/api.generated.clients").Provider[]>;
            required: true;
        };
    }, void, {
        loading: boolean;
        message: string;
        providers: import("../Services/umbraco/generated/api.generated.clients").Provider[];
        currentDomain: string;
        currentProvider: string;
    }, {}, {
        refreshAllProviders(): Promise<void>;
        refreshProvider(provider: import("../Services/umbraco/generated/api.generated.clients").Provider): Promise<void>;
        refreshDomain(domain: string): Promise<void>;
        fetchData(): Promise<void>;
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        message: StringConstructor;
        providers: {
            type: import("vue").PropType<import("../Services/umbraco/generated/api.generated.clients").Provider[]>;
            required: true;
        };
    }>>, {}, {}>;
    render: () => {
        components: {
            CdnDashboard: import("vue").DefineComponent<{
                message: StringConstructor;
                providers: {
                    type: import("vue").PropType<import("../Services/umbraco/generated/api.generated.clients").Provider[]>;
                    required: true;
                };
            }, void, {
                loading: boolean;
                message: string;
                providers: import("../Services/umbraco/generated/api.generated.clients").Provider[];
                currentDomain: string;
                currentProvider: string;
            }, {}, {
                refreshAllProviders(): Promise<void>;
                refreshProvider(provider: import("../Services/umbraco/generated/api.generated.clients").Provider): Promise<void>;
                refreshDomain(domain: string): Promise<void>;
                fetchData(): Promise<void>;
            }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
                message: StringConstructor;
                providers: {
                    type: import("vue").PropType<import("../Services/umbraco/generated/api.generated.clients").Provider[]>;
                    required: true;
                };
            }>>, {}, {}>;
        };
        template: string;
    };
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const LoggedIn: Story;
