import { TemplateResult } from "lit";
import type { ArgTypes, Options } from "./storybook";
import { getStyleTemplate, getTemplate } from "./html-templates.js";
import {
  getComponentByTagName,
  getCssParts,
  getCssProperties,
  getAttributesAndProperties,
  getReactEvents,
  getReactProperties,
  getSlots,
  getEvents,
} from "./cem-utilities.js";
import { Declaration } from "./cem-schema";

/**
 * sets the global config for the Storybook helpers
 * @param options
 */
export function setWcStorybookHelpersConfig(options: Options) {
  (window as any).__WC_STORYBOOK_HELPERS_CONFIG__ = options;
}

/**
 * Gets Storybook helpers for a given component
 * @param tagName the tag name referenced in the Custom Elements Manifest
 * @returns An object containing the argTypes, reactArgTypes, events, styleTemplate, and template
 */
export function getWcStorybookHelpers(tagName: string) {
  /**
   *
   * uses the global window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__
   * variable created by the Storybook `setCustomElementsManifest`
   * method in the `preview.cjs` file
   *
   */
  const cem = (window as any).__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__;
  if (!cem) {
    throw new Error(
      "Custom Elements Manifest not found. Be sure to follow the pre-install steps in this guide:\nhttps://www.npmjs.com/package/wc-storybook-helpers#before-you-install"
    );
  }

  const component = getComponentByTagName(tagName, cem);
  const eventNames = component?.events?.map((event) => event.name) || [];
  const argTypes = getArgTypes(component);

  return {
    args: getArgs(component),
    argTypes,
    reactArgTypes: getReactProps(component),
    events: eventNames,
    styleTemplate: (args?: any) => getStyleTemplate(component, args),
    template: (args?: any, slot?: TemplateResult) =>
      getTemplate(component, args, slot, argTypes),
  };
}

/**
 * Gets the Storybook `argTypes` (controls) for the component
 * @param component component object from the Custom Elements Manifest
 * @returns an object containing the `argTypes` for the component
 */
function getArgTypes(component?: Declaration): ArgTypes {
  // Attributes and properties must go last to prevent namespaced attributes from being overwritten
  const argTypes: ArgTypes = {
    ...getCssProperties(component),
    ...getCssParts(component),
    ...getSlots(component),
    ...getAttributesAndProperties(component),
    ...getEvents(component)
  };

  return argTypes;
}

/**
 * Gets the Storybook `args` (default values) for the component
 * @param component component object from the Custom Elements Manifest
 * @returns an object containing the `args` for the component
 */
function getArgs(component?: Declaration): Record<string, any> {
  const args = Object.entries(getArgTypes(component))
    // We only want to get args that have a control in Storybook
    .filter(([, value]) => value?.control)
    .map(([key, value]) => {
      const defaultValue = getDefaultValue(value.defaultValue);
      return {
        [key]: defaultValue === undefined ? '' : defaultValue,
      };
    })
    .reduce((acc, value) => ({ ...acc, ...value }), {});

  return args;
}

/**
 * Gets the default value for a given attribute/property in the CEM
 * @param value the default value from the Custom Elements Manifest
 * @returns the default value
 */
function getDefaultValue(value?: string | number | boolean | object) {
  try {
    return JSON.parse(value as string);
  } catch (error) {
    return value;
  }
}

/**
 * Gets the Storybook `argTypes` (controls) formatted for React components
 * @param component component object from the Custom Elements Manifest
 * @returns an object containing the `argTypes` for a React component
 */
function getReactProps(component?: Declaration): ArgTypes {
  const argTypes: ArgTypes = {
    ...getReactProperties(component),
    ...getReactEvents(component),
    ...getCssProperties(component),
    ...getCssParts(component),
    ...getSlots(component),
  };

  return argTypes;
}
