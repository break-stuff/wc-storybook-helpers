# CHANGELOG

## 2.0.0

- Added support for Storybook 8
- Removed support for Storybook 6
- Moved CSS Custom Properties to `<style>` block instead of as an inline style for better readability when displaying code.
- Renamed `renderDefaultAttributeValues` setting to `renderDefaultValues` to include attributes and CSS custom properties.
- Renamed `hideScriptTag` setting to `setComponentVariable` for assigning a `component` variable referencing your custom element in the `template` helper. 
- Added a link to the StackBlitz sandbox environment to the `README.md`
- Removed default `<span>` tag from values with slot controls. Spans assigned to the slot will still be used to wrap text content. Otherwise, the appropriate slot attributes name will be assigned to the immediate child elements.
- Improved formatting for code display

## 1.5.3

- Update types to include new options
- Update docs to include more details for configuration

## 1.5.2

- Fixed `peerDependency` error
- Fixed `toString` error when CSS Property default values are `undefined`

## 1.5.1

- Removed Storybook events from templates

## 1.5.0

- Removed unused `@open-wc/lit-helpers` dependency
- Moved `lit` to a `peerDependency` to prevent multiple versions of Lit
- Added `reactArgs` property for beta React wrapper support

## 1.4.1

- Disable controls for `reactArgTypes` except for properties

## 1.4.0

- Fixed false negatives for properties that don't have `setters`.
- Allow additional attributes used in `args` to be added to stories.
- Removed controls for events

## 1.3.1

- Fixed issue with missing `component` variable in `template()` helper

## 1.3.0

- Fixed timing issue with `component` variable in `template()` helper
- Remove attributes when they match the default value. They can be added back in using the `renderDefaultAttributeValues` setting
- Add `hideScriptTag` option to hide the script tag section of the template
- Fix logic to hide styles tag when no CSS parts have been added

## 1.2.2

- Remove unset attributes

## 1.2.1

- Add patch for error cause when elements do not have attributes

## 1.2.0

- Set control "color" for CSS variables that include the word "color"
- Removed `ref` control if it is included in the list of React properties.

## 1.1.1

- Added stricter type checks for determining controls 

## 1.1.0

- Updated control type for attributes to not support the object controller since they do not map to the component properly
- *Minor version jump since v1.0.9 should have been a feature and not a patch

## 1.0.10

- Add patch for errors with "getter" only properties

## 1.0.9

- Fix `object` type control
- Fix select mapping
- Update default value mapping

## 1.0.8

- Fix control types
- Fix object binding
- Remove trailing double-quotes (`"`) from descriptions
- Add docs for Actions

## 1.0.7

- Patched attribute mapping for Stencil

## 1.0.6

- Fix duplicate attributes in `argTypes`


## 1.0.5

- Fix missing attributes in `argTypes`

## 1.0.4

- Fix error for getter-only properties.

## 1.0.3

- Included missing `storybook` type definition file.

## 1.0.2

- Add missing export in the type definition file for `setWcStorybookHelpersConfig`

## 1.0.1

- Reduce package size
- Fix failing tests

## 1.0.0

- Code clean-up and optimizations for release

## 1.0.0-beta.3

- Prep for Storybook 7

## 1.0.0-beta.2

- Add better control selection
- Allow for `undefined`/empty values in controls
- Provide better default value support

## 1.0.0-beta.1

- Add error if Custom Elements Manifest is not found.
- Update logic for finding component by tag name.

## 1.0.0-beta.0

- Initial commit
