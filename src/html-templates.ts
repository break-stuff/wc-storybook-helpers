import { spread } from "./spread";
import { useArgs } from "@storybook/client-api";
import { TemplateResult } from "lit";
import { html, unsafeStatic } from "lit/static-html.js";
import { Declaration } from "./cem-schema";
import {
  getAttributesAndProperties,
  getCssParts,
  getCssProperties,
  getSlots,
} from "./cem-utilities.js";
import { Options } from "./storybook";

let argObserver: MutationObserver | undefined;
let lastTagName: string | undefined;

let options: Options = {};

setTimeout(() => {
  options = (globalThis as any)?.__WC_STORYBOOK_HELPERS_CONFIG__ || {};
});

/**
 * Gets the template used to render the component in Storybook
 * @param component component object from the Custom Elements Manifest
 * @param args args object from Storybook story
 * @param slot content to be rendered between the component's opening and closing tags
 * @returns
 */
export function getTemplate(
  component?: Declaration,
  args?: any,
  slot?: TemplateResult
): TemplateResult {
  if (!args) {
    return html`<${unsafeStatic(component!.tagName!)}></${unsafeStatic(
      component!.tagName!
    )}>`;
  }

  // reset argObserver if the component changes
  if (component?.tagName !== lastTagName) {
    argObserver = undefined;
    lastTagName = component?.tagName;
  }

  const { attrOperators, propOperators } = getTemplateOperators(
    component!,
    args
  );
  const operators = { ...attrOperators, ...propOperators };
  const slotsTemplate = getSlotsTemplate(component!, args);
  const cssPropertiesTemplate = getCssPropTemplate(component!, args);
  syncControls(component!);

  return html`${getStyleTemplate(component, args)}
<${unsafeStatic(component!.tagName!)} 
  ${spread(operators)}
  ${cssPropertiesTemplate}
  >
    ${slotsTemplate}${slot || ""}
</${unsafeStatic(component!.tagName!)}>
${
  options.hideScriptTag
    ? ""
    : html`<script>
        component = document.querySelector("${component!.tagName!}");
      </script>`
}
`;
}

/**
 * Gets the template used to render the component's styles in Storybook
 * @param component component object from the Custom Elements Manifest
 * @param args args object from Storybook story
 * @returns styles in a tagged template literal
 */
export function getStyleTemplate(component?: Declaration, args?: any) {
  const cssPartsTemplate = getCssPartsTemplate(component!, args) || "";

  return `${cssPartsTemplate}`.replaceAll(/\s+/g, "") != ""
    ? html`<style>
        ${unsafeStatic(cssPartsTemplate)}
      </style> `
    : "";
}

/**
 * Gets a formatted object with the component's attributes and properties formatted to be used as operators in the template
 * @param component component object from the Custom Elements Manifest
 * @param args args object from Storybook story
 * @returns object of properties and attributes with their values
 */
function getTemplateOperators(component: Declaration, args: any) {
  const attributes = getAttributesAndProperties(component);
  const attrOperators: any = {};
  const propOperators: any = {};

  Object.keys(attributes).forEach((key) => {
    const attr = attributes[key];
    if (attr?.table?.category !== "attributes") {
      return;
    }

    const attrName = attr.name;
    const attrValue = args![key] as unknown;
    const prop: string =
      (attr.control as any).type === "boolean" ? `?${attrName}` : attrName;
    if (attrValue !== attributes[key].defaultValue || options.renderDefaultAttributeValues) {
      attrOperators[prop] = attrValue === "false" ? false : attrValue;
    }
  });

  Object.keys(args)
    .filter((key) => attributes[key]?.table?.category === "properties")
    .forEach((key) => {
      if (key.startsWith("on")) {
        return;
      }

      const propValue = args![key];
      propOperators[`.${key}`] = propValue;
    });

  return { attrOperators, propOperators };
}

/**
 * Gets the template used to render the component's styles in Storybook
 * @param component component object from the Custom Elements Manifest
 * @param args args object from Storybook story
 * @returns string of css properties with arg values
 */
function getCssPropTemplate(component: Declaration, args: any) {
  if (!component?.cssProperties?.length) {
    return;
  }

  const cssProperties = getCssProperties(component);

  return unsafeStatic(
    `style="${Object.keys(cssProperties)
      .map((key) => {
        const cssName = cssProperties[key].name;
        const cssValue = args![key];
        return cssValue ? `${cssName}: ${cssValue || ""}` : null;
      })
      .filter((value) => value !== null)
      .join(";")}"`
  );
}

/**
 * Gets the template used to render the component's CSS Shadow Parts in Storybook
 * @param component component object from the Custom Elements Manifest
 * @param args args object from Storybook story
 * @returns formatted string with CSS shadow parts and their styles
 */
function getCssPartsTemplate(component: Declaration, args: any) {
  if (!component?.cssParts?.length) {
    return;
  }

  const cssParts = getCssParts(component);

  return `${Object.keys(cssParts)
    .filter((key) => key.endsWith("-part"))
    .map((key) => {
      const cssPartName = cssParts[key].name;
      const cssPartValue = args![key] || "";
      return cssPartValue.replaceAll(/\s+/g, "") !== ""
        ? `${component?.tagName}::part(${cssPartName}) {
              ${cssPartValue || ""}
            }`
        : null;
    })
    .filter((value) => value !== null)
    .join("\n")}`;
}

/**
 * Gets the template used to render the component's slots in Storybook
 * @param component component object from the Custom Elements Manifest
 * @param args args object from Storybook story
 * @returns formatted string with slots and their values
 */
function getSlotsTemplate(component: Declaration, args: any) {
  if (!component?.slots?.length) {
    return;
  }

  const slots = getSlots(component);

  return unsafeStatic(
    `${Object.keys(slots)
      .filter((key) => key.endsWith("-slot"))
      .map((key) => {
        const slotName = slots[key].name;
        const slotValue = args![key];
        return slotValue
          ? slotName === "default"
            ? `${slotValue || ""}`
            : `<span slot="${slotName}">${slotValue || ""}</span>`
          : null;
      })
      .filter((value) => value !== null)
      .join("\n")}`
  );
}

/**
 * Watches for changes to the component's attributes and properties and updates Storybook controls
 * @param component component object from the Custom Elements Manifest
 */
function syncControls(component: Declaration) {
  setArgObserver(component);

  // wait for story to render before trying to attach the observer
  setTimeout(() => {
    const selectedComponent = document.querySelector(component.tagName!)!;
    argObserver?.observe(selectedComponent, {
      attributes: true,
    });
  });
}

/**
 * Sets up the MutationObserver to sync the component's attributes and properties with Storybook controls
 * @param component component object from the Custom Elements Manifest
 */
function setArgObserver(component: Declaration) {
  let isUpdating = false;
  const updateArgs = useArgs()[1];
  const attributes = getAttributesAndProperties(component);

  if (argObserver) {
    return;
  }

  argObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        (mutation.type as string) !== "attributes" ||
        (mutation.attributeName === "class" && isUpdating)
      ) {
        return;
      }

      isUpdating = true;
      const attribute = attributes[`${mutation.attributeName}`];
      if (
        attribute?.control === "boolean" ||
        (attribute?.control as any)?.type === "boolean"
      ) {
        updateArgs({
          [`${mutation.attributeName}`]: (
            mutation.target as HTMLElement
          )?.hasAttribute(mutation.attributeName || ""),
        });
      } else {
        updateArgs({
          [`${mutation.attributeName}`]: (
            mutation.target as HTMLElement
          ).getAttribute(mutation.attributeName || ""),
        });
      }

      isUpdating = false;
    });
  });
}
