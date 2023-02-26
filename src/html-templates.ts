import { spread } from "@open-wc/lit-helpers";
import { useArgs } from "@storybook/client-api";
import { TemplateResult } from "lit";
import { html, unsafeStatic } from "lit/static-html.js";
import { Declaration } from "./cem-schema";
import { getAttributesAndProperties, getCssParts, getCssProperties, getSlots } from "./cem-utilities.js";

let argObserver: MutationObserver | undefined;
let lastTagName: string | undefined;

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

  const operators = getTemplateOperators(component!, args);
  const slotsTemplate = getSlotsTemplate(component!, args);
  syncControls(component!);

  return html`
      ${getStyleTemplate(component, args)}
      <${unsafeStatic(component!.tagName!)} ${spread(operators)}>
        ${slotsTemplate}
        ${slot || ""}
      </${unsafeStatic(component!.tagName!)}>
      <script>
        component = document.querySelector('${component!.tagName!}');
      </script>
    `;
}

export function getStyleTemplate(component?: Declaration, args?: any) {
  const cssPropertiesTemplate = getCssPropTemplate(component!, args);
  const cssPartsTemplate = getCssPartsTemplate(component!, args);

  return html`
    <style>
      ${cssPropertiesTemplate}
      ${cssPartsTemplate}
    </style>
  `;
}

function getTemplateOperators(component: Declaration, args: any) {
  const attributes = getAttributesAndProperties(component);
  const operators: any = {};

  Object.keys(attributes)
    .filter((key) => key.endsWith("-attr"))
    .forEach((key) => {
      const attr = attributes[key];
      const attrName = attributes[key].name;
      const attrValue = args![key] as unknown;
      const prop: string =
        (attr.control as any).type === "boolean" ? `?${attrName}` : attrName;
      operators[prop] = attrValue === "false" ? false : attrValue;
    });

  Object.keys(args)
    .filter(
      (key) =>
        !key.endsWith("-attr") &&
        !key.endsWith("-part") &&
        !key.endsWith("-slot")
    )
    .forEach((key) => {
      if (key.startsWith("on")) {
        return;
      }

      const propValue = args![key];
      operators[`.${key}`] = propValue;
    });

  return operators;
}

function getCssPropTemplate(component: Declaration, args: any) {
  const cssProperties = getCssProperties(component);

  const template = unsafeStatic(`
      ${component?.tagName} {
        ${Object.keys(cssProperties)
          .map((key) => {
            const cssName = cssProperties[key].name;
            const cssValue = args![key];
            return cssValue ? `${cssName}: ${cssValue || ""};` : "";
          })
          .join("\n")}
      }`);

  return template;
}

function getCssPartsTemplate(component: Declaration, args: any) {
  const cssParts = getCssParts(component);

  const template = unsafeStatic(
    `${Object.keys(cssParts)
      .filter((key) => key.endsWith("-part"))
      .map((key) => {
        const cssPartName = cssParts[key].name;
        const cssPartValue = args![key];
        return `${component?.tagName}::part(${cssPartName}) {
          ${cssPartValue || ""}
        }`;
      })
      .join("\n")}`
  );

  return template;
}

function getSlotsTemplate(component: Declaration, args: any) {
  const slots = getSlots(component);

  const template = unsafeStatic(
    `${Object.keys(slots)
      .filter((key) => key.endsWith("-slot"))
      .map((key) => {
        const slotName = slots[key].name;
        const slotValue = args![key];

        return slotValue
          ? slotName === "default"
            ? `${slotValue || ""}`
            : `<div slot="${slotName}">${slotValue || ""}</div>`
          : "";
      })
      .join("\n")}`
  );

  return template;
}

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
      const attribute = attributes[`${mutation.attributeName}-attr`];
      if (
        attribute?.control === "boolean" ||
        (attribute?.control as any)?.type === "boolean"
      ) {
        updateArgs({
          [`${mutation.attributeName}-attr`]: (
            mutation.target as HTMLElement
          )?.hasAttribute(mutation.attributeName || ""),
        });
      } else {
        updateArgs({
          [`${mutation.attributeName}-attr`]: (
            mutation.target as HTMLElement
          ).getAttribute(mutation.attributeName || ""),
        });
      }

      isUpdating = false;
    });
  });
}
