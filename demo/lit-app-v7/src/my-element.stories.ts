import type { Meta, StoryObj } from "@storybook/web-components";
import type { MyElement } from "./my-element";
import "./my-element";
import { getWcStorybookHelpers } from "../../..";

const { args, events, argTypes, template } =
  getWcStorybookHelpers("my-element");

const meta: Meta = {
  title: "Components/My Element",
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
  render: (args) => template(args),
  args: {},
};
