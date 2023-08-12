import { html } from "lit";
import "./my-element";
import { getWcStorybookHelpers } from '../../..';

const { events, argTypes, template } = getWcStorybookHelpers("my-element");


export default {
  title: "Components/My Element",
  component: "my-element",
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};

const DefaultTemplate = (args: any) => {
  return html`
    ${template(args)}
    
  `;
};

export const Default: any = DefaultTemplate.bind({});
Default.args = {
};
