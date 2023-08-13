import type { Meta, StoryObj } from '@storybook/web-components';
import "./my-element";
import { getWcStorybookHelpers } from "../../..";

const { args, events, argTypes, template } =
  getWcStorybookHelpers("my-element");

console.log("argTypes", argTypes);

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

export const Default: StoryObj = {
  render: (args) => template(args),
  args: {
    docsHintAttr: "my-element",
  }
}
