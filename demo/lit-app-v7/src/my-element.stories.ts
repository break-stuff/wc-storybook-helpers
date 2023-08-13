import { html } from "lit";
import "./my-element";
import { getWcStorybookHelpers } from "../../..";

const { args, events, argTypes, template } =
  getWcStorybookHelpers("my-element");

console.log("argTypes", argTypes);

export default {
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

const DefaultTemplate = (args: any) => {
  return html` ${template(args)} `;
};

export const Default: any = DefaultTemplate.bind({});
Default.args = {};
