import type { Meta, StoryObj } from "@storybook/web-components";
import type { MyElement } from "./my-element";
import "./my-element";
declare const args: Record<string, any>;
declare const meta: Meta;
export default meta;
export declare const Default: StoryObj<MyElement & typeof args>;
