import type { Preview } from "@storybook/web-components";
import { setCustomElementsManifest } from "@storybook/web-components";
import customElements from "../custom-elements.json";
import { setWcStorybookHelpersConfig } from "../../..";

setWcStorybookHelpersConfig({ hideArgRef: true, typeRef: "expandedType" });
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
