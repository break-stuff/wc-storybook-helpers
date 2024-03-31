import { getWcStorybookHelpers } from "wc-storybook-helpers";
import { html } from "lit";
import "./my-element";
import type { StoryObj } from "@storybook/web-components";
import type { MyElement } from "./my-element";

const { args, events, argTypes, template } =
  getWcStorybookHelpers("my-element");

const meta = {
  title: "My Element",
  component: "my-element",
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;

export const Default: StoryObj<MyElement & typeof args> = {
  render: (args) => html` ${template(args)} `,
  args: {
    "data-test": "test",
  },
};
