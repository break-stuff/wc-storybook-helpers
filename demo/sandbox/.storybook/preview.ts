import type { Preview } from "@storybook/web-components";
import { setCustomElementsManifest } from "@storybook/web-components";
import customElements from "../custom-elements.json";
import { setWcStorybookHelpersConfig } from "wc-storybook-helpers";

setWcStorybookHelpersConfig({
  /** hides the `arg ref` label on each control */
  hideArgRef: false,
  /** sets the custom type reference in the Custom Elements Manifest */
  typeRef: "expandedType",
  /** Adds a <script> tag where a `component` variable will reference the story's component */
  setComponentVariable: false,
  /** doesn't render attributes when their value is equal to the default value of that attribute */
  renderDefaultAttributeValues: false,
});

setCustomElementsManifest(customElements);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
