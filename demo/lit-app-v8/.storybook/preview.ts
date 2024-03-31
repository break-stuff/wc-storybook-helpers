import type { Preview } from "@storybook/web-components";
import { setCustomElementsManifest } from "@storybook/web-components";
import customElements from "../custom-elements.json";
import { setWcStorybookHelpersConfig } from "../../..";
import { withActions } from '@storybook/addon-actions/decorator';

setWcStorybookHelpersConfig({
  hideArgRef: false,
  typeRef: "expandedType",
  renderDefaultValues: false
});
setCustomElementsManifest(customElements);

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      sort: 'alpha'
    },
  },
  decorators: [withActions],
};

export default preview;
