import "./my-element";
import type { StoryObj } from "@storybook/web-components";
import type { MyElement } from "./my-element";
declare const args: Record<string, any>;
declare const meta: {
    title: string;
    component: string;
    args: Record<string, any>;
    argTypes: import("wc-storybook-helpers/dist/storybook").ArgTypes;
    parameters: {
        actions: {
            handles: string[];
        };
    };
};
export default meta;
export declare const Default: StoryObj<MyElement & typeof args>;
