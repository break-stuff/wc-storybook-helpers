# Storybook Helpers for Web Components

These helpers are designed to make integrating Web Components with Storybook easier.

There are a number of things that this helper library does to provide developers a better experience with Storybook and Web Components:

1. Uses types to provide better controls
2. Prevents name collisions when attributes, properties, slots, and CSS shadow parts share the same name
3. Provides a template with bindings for attributes, properties, CSS custom properties, and CSS shadow parts.
4. Provides two-way binding for controls and attributes in the template to help keep control values in sync with the component

<div style="text-align:center; margin-top: 24px;">
  <a href="https://stackblitz.com/github/break-stuff/wc-storybook-helpers/tree/main/demo/sandbox">
    <img
      alt="Open in StackBlitz"
      src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
    />
  </a>
</div>

## Before You Install

1. Follow the installation steps in the [Storybook docs](https://storybook.js.org/docs/web-components/get-started/install)
2. Load you custom elements manifest into Storybook in the `preview.js` file:

```js
import { setCustomElementsManifest } from "@storybook/web-components";
import customElements from "./path/to/custom-elements.json";

setCustomElementsManifest(customElements);
```

3. Add the expanded controls to your config in the `preview.js` file:

```js
export const parameters = {
  ...
  controls: {
    expanded: true,
    ...
  },
}
```

## Installation

```bash
npm i -D wc-storybook-helpers
```

## Setup

Import the storybook helpers into your story:

```js
import { getWcStorybookHelpers } from "wc-storybook-helpers";
```

Pass your element's tag name into the Storybook helper function.

```js
const { events, args, argTypes, template } =
  getWcStorybookHelpers("my-element");
```

Add the `argTypes` and `events` to your story config:

```js
// Storybook v7
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta<MyElement> = {
  title: "Components/My Element",
  component: "my-element",
  args, // <- default values for Storybook v7
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;
```

Add the template to your story's template and pass in the story `args` into the `template` function (this is an optional parameter, but required for arguments to function properly):

```ts
/**
 * create Story type that will provide autocomplete and docs for `args`,
 * but also allow for namespaced args like CSS Shadow Parts and Slots
 */
type Story = StoryObj<MyElement & typeof args>;

export const Default: Story = {
  render: (args) => template(args),
  args: {},
};
```

## `argTypes`

Based on the data in the custom elements manifest, the helpers will apply appropriate descriptions and control types to your arguments.

### Control Types

The default control types are not always the most helpful. The helper will use your types try to identify the appropriate input and options for your control.

For example if your component has an attribute called `variant` with predefined values, the helper will convert it to a select that is pre-populated with the appropriate values and the default value selected.

![screenshot of storybook control panel with a select input expanded displaying options](https://github.com/break-stuff/wc-storybook-helpers/blob/main/demo/img/variants.png?raw=true)

### Name-Spaced Controls

One of the challenges with the default implementation is that if there are multiple properties with the same name, they will be overridden. For example, if there is an attribute named `label` as well as a slot named `label` only one will display. In order to ensure every argument is displayed properly, CSS Shadow Part and Slot arguments will be suffixed with `-part`, and `-slot` respectively. CSS Custom Properties don't receive one because they already have a unique property value and attributes and properties will rely on the camel-cased property name.

The reference name will be documented with the control's description.

![screenshot of storybook control panel with arrow pointing to the "arg ref" label](https://github.com/break-stuff/wc-storybook-helpers/blob/main/demo/img/arg-ref.png?raw=true)

That reference can then be used to bind default values to the template.

```ts
const DefaultTemplate = (args: any) => template(args);

export const Default: any = DefaultTemplate.bind({});
Default.args = {
  docsHint: "Some other value than the default",
};
```

```ts
// Storybook v7
export const Default: Story = {
  render: (args) => template(args),
  args: {
    docsHint: "Some other value than the default",
  },
};
```

### Deprecated Controls

If you use the `@deprecated` tag in your jsDoc descriptions, those will also display in the description.

```ts
/**
 * @deprecated replaced by `docs-hint`
 * Copy for the read the docs hint.
 */
@property({ attribute: "old-docs-hint", reflect: true })
oldDocsHint = "Click on the Vite and Lit logos to learn more";
```

![screenshot of storybook control panel with "deprecated" label in the description](https://github.com/break-stuff/wc-storybook-helpers/blob/main/demo/img/deprecated.png?raw=true)

### Overriding Controls

If you would like to change any of your controls, you can easily override it using the spread operator and passing in an updated `argType` after the helper `argTypes`.

```js
export default {
  title: "Components/My Element",
  component: "my-element",
  argTypes: {
    ...argTypes,
    docsHintAttr: {
      name: 'docs-hint',
      description: '...',
      defaultValue: '...',
      control: {
        type: '...',
      },
      table: {
        category: 'attributes',
        defaultValue: {
          summary: '...',
        },
        type: {
          summary: '`string`',
        },
      },
  },
  ...
};
```

## Events

If you want to capture the events output by your component, you can map them to your story's config under the parameter's section.

**Note:** They will only be captured if the `bubbles` option on your `CustomEvent` is set to `true` (note - it is `true` by default).

```js
export default {
  ...
  parameters: {
    actions: {
      handles: events,
    },
  },
};
```

If you would like to map additional events to your story, you can use the spread operator to extend the values.

```js
export default {
  ...
  parameters: {
    actions: {
      handles: [...events, 'my-other-event'],
    },
  },
};
```

### Events in Actions Tab

If you are not seeing the events show up in your actions tab, it may be one of two things:

1. Your events are not [configured to bubble](https://javascript.info/dispatch-events#bubbling-example).
2. Your Storybook configuration needs to be updated to include the `withActions` decorator.

```ts
// preview.js
import { withActions } from '@storybook/addon-actions/decorator';

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      sort: 'alpha'
    },
  },
  decorators: [withActions],
};
```

## Templates

Templates are configured to automatically map the control's attributes, properties, CSS custom properties, and CSS shadow parts to your element as well as provide two-way data binding for the component attributes back to the controls to keep them in sync.

Templates take 2 arguments - story arguments and slot data. You can use the controls and story `args` to provide slot data, but if you want more granular control, using the `slot` parameter on the template with more editor support.

```ts
const SelectTemplate = (args: any) =>
  template(
    args,
    html`
      <span slot="label">My Select</span>
      <my-option>Option 1</my-option>
      <my-option>Option 2</my-option>
      <my-option>Option 3</my-option>
    `
  );

export const Default: any = SelectTemplate.bind({});
Default.args = {
  docsHint: "Some other value than the default",
};
```

### Extending Templates

Component templates can be interpolated into a story's template with additional content.

```ts
const FormTemplate = (args: any) => html`
  <form>
    ${template(
      args,
      html`
        <span slot="label">My Select</span>
        <my-option>Option 1</my-option>
        <my-option>Option 2</my-option>
        <my-option>Option 3</my-option>
      `
    )}

    <button>Submit</button>
  </form>
`;
```

The template also exposes a variable named `component` that references the custom element so you can use custom logic with it.

```ts
const ComponentTemplate = (args: any) => html`
  ${template(
    args,
    html`
      <span slot="label">My Select</span>
      <my-option value="1">Option 1</my-option>
      <my-option value="2">Option 2</my-option>
      <my-option value="3">Option 3</my-option>
    `
  )}
  <script>
    // set property values
    component.value = "2";

    // call component methods
    component.show();
  </script>
`;
```

## Using Slot Controls

If you are using the `template`, using slots form the controls panel is fairly straight forward. The input is already wired up to the appropriate slot and so rich content can be added directly to the input with no additional set-up required.

![screenshot of storybook control panel with a select input expanded displaying options](https://github.com/break-stuff/wc-storybook-helpers/blob/main/demo/img/slots.png?raw=true)

## Using CSS Shadow Parts Controls

Like the slot controls, the `template` makes working with CSS Shadow Parts easy. The template is pre-configured with the appropriate code to apply styles to the component's parts. You can simply apply the styles directly to the control input.

![screenshot of storybook control panel with a select input expanded displaying options](https://github.com/break-stuff/wc-storybook-helpers/blob/main/demo/img/parts.png?raw=true)

## Configuration

The helpers package provides a way to set global configurations for your stories using the `setWcStorybookHelpersConfig` function. This can be added to the `.storybook/preview.js` file.

```ts
//preview.js
import { setWcStorybookHelpersConfig } from "wc-storybook-helpers";

setWcStorybookHelpersConfig({ ... });
setCustomElementsManifest(customElements);
```

The helpers can be passed the following options:

```ts
interface Options {
  /** hides the `arg ref` label on each control */
  hideArgRef?: boolean;
  /** sets the custom type reference in the Custom Elements Manifest */
  typeRef?: string;
  /** Adds a <script> tag where a `component` variable will reference the story's component */
  setComponentVariable: false,
  /** renders default values for attributes and CSS properties */
  renderDefaultValues: false,
}
```

### Hide "Arg Refs"

There may be times you want to hide the "arg ref" label. You can set the `hideArgRef` to `true` and it will remove the label from controls.

```ts
setWcStorybookHelpersConfig({ hideArgRef: true });
```

### Custom Types using `typeRef`

It is common for teams to parse or create custom types and add them to the Custom Elements Manifest to use for other tools (if you're not already, [CEM Analyzer Expanded Types plugin](https://www.npmjs.com/package/cem-plugin-expanded-types)) can help with this. The helpers can be configured to use those types instead of the default types in your manifest using the `typeRef`. If no custom type is found, it will fallback to the default type.

```ts
setWcStorybookHelpersConfig({ typeRef: "expandedType" });
```

### Add Component Variable

Every story using the `template` helper includes the option to add a script tag with a reference to the custom element in the `component` variable. The `setComponentVariable` option adds this script tag and the variable.

```ts
setWcStorybookHelpersConfig({ setComponentVariable: true });
```

### Render Default Attribute Values

If an `arg` value matches the default value, it will not be added to the component. To always show the default values for attributes and CSS custom properties, enable the `renderDefaultValues` setting:

```ts
setWcStorybookHelpersConfig({ renderDefaultValues: true });
```
