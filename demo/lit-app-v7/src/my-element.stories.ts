import type { StoryObj } from "@storybook/web-components";
import type { MyElement } from "./my-element";
import "./my-element";
import { getWcStorybookHelpers } from "../../..";

const { args, events, argTypes, template } =
  getWcStorybookHelpers("my-element");

console.log(args);
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
  render: (args) => template(args),
  args: {},
};
