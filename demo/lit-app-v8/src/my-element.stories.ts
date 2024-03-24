import type { StoryObj } from "@storybook/web-components";
import type { MyElement } from "./my-element";
import "./my-element";
import { getWcStorybookHelpers } from "../../..";
import { html } from "lit";

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
  render: (args) => html`
    ${template(args)}
    <script>
      console.log("component", component);
    </script>
  `,
  args: {
    'data-test': 'test',
  },
};
