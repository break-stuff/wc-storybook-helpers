import { CustomElementsManifest, Declaration } from "./cem-schema";
import { ArgTypes, ControlOptions } from "./storybook";

export function getComponentByTagName(
  tagName: string,
  customElementsManifest: CustomElementsManifest
): Declaration | undefined {
  const module = (
    customElementsManifest as CustomElementsManifest
  ).modules?.find((m) => m.declarations?.some((d) => d.tagName === tagName));
  return module?.declarations[0];
}

export function getAttributes(component?: Declaration): ArgTypes {
  const attributes: ArgTypes = {};

  component?.attributes?.forEach((attribute) => {
    attributes[attribute.name] = {
      name: attribute.name,
      table: {
        disable: true,
      },
    };

    const attrType = cleanUpType(attribute?.type?.text);
    const attrName = `${attribute.name}-attr`;
    attributes[attrName] = {
      name: attribute.name,
      description: getDescription(attribute.description, attrName),
      defaultValue: removeQuoteWrappers(attribute.default),
      control: {
        type: getControl(attrType),
      },
      table: {
        category: "attributes",
        defaultValue: {
          summary: removeQuoteWrappers(attribute.default),
        },
        type: {
          summary: attribute?.type?.text,
        },
      },
    };

    const values = attrType?.split("|");
    if (values && values?.length > 1) {
      attributes[attrName].options = values.map((x) => removeQuoteWrappers(x)!);
    }
  });

  return attributes;
}

export function getProperties(component?: Declaration): ArgTypes {
  const properties: ArgTypes = {};

  component?.members?.forEach((member) => {
    if (member.kind !== "field") {
      return;
    }

    properties[member.name] = {
      name: member.name,
      table: {
        disable: true,
      },
    };

    if (
      member.attribute ||
      member.privacy === "private" ||
      member.privacy === "protected" ||
      member.static
    ) {
      return;
    }

    const propType = cleanUpType(member?.type?.text);
    const propName = `${member.name}-prop`;
    properties[propName] = {
      name: member.name,
      description: getDescription(member.description, propName),
      defaultValue: removeQuoteWrappers(member.default),
      control: {
        type: getControl(propType),
      },
      table: {
        category: "properties",
        defaultValue: {
          summary: removeQuoteWrappers(member.default),
        },
        type: {
          summary: member?.type?.text,
        },
      },
    };

    const values = propType?.split("|");
    if (values && values?.length > 1) {
      properties[propName].options = values.map((x) => removeQuoteWrappers(x)!);
    }
  });

  return properties;
}

export function getReactProperties(component?: Declaration): ArgTypes {
  const properties: ArgTypes = {};

  component?.members?.forEach((member) => {
    if (member.kind !== "field") {
      return;
    }

    properties[member.name] = {
      name: member.name,
      table: {
        disable: true,
      },
    };

    if (
      member.privacy === "private" ||
      member.privacy === "protected" ||
      member.static
    ) {
      return;
    }

    const propType = cleanUpType(member?.type?.text);
    const propName = `${member.name}`;
    const cemDefaultValue = removeQuoteWrappers(member.default);
    properties[propName] = {
      name: member.name,
      description: member.description,
      defaultValue: cemDefaultValue === "false" ? false : cemDefaultValue,
      control: {
        type: getControl(propType),
      },
      table: {
        category: "properties",
        defaultValue: {
          summary: removeQuoteWrappers(member.default),
        },
        type: {
          summary: member?.type?.text,
        },
      },
    };

    const values = propType?.split("|");
    if (values && values?.length > 1) {
      properties[propName].options = values.map((x) => removeQuoteWrappers(x)!);
    }
  });

  // console.log(component?.tagName, properties);

  return properties;
}

export function getReactEvents(component?: Declaration): ArgTypes {
  const events: ArgTypes = {};

  component?.events?.forEach((member) => {
    const eventName = getReactEventName(member.name);
    events[eventName] = {
      name: eventName,
      description: member.description,
      table: {
        category: "events",
      },
    };
  });

  return events;
}

export function getCssProperties(component?: Declaration): ArgTypes {
  const properties: ArgTypes = {};

  component?.cssProperties?.forEach((property) => {
    properties[property.name] = {
      name: property.name,
      description: property.description,
      defaultValue: property.default,
      control: {
        type: "text",
      },
    };
  });

  return properties;
}

export function getCssParts(component?: Declaration): ArgTypes {
  const parts: ArgTypes = {};

  component?.cssParts?.forEach((part) => {
    parts[part.name] = {
      name: part.name,
      table: {
        disable: true,
      },
    };

    parts[`${part.name}-part`] = {
      name: part.name,
      description: getDescription(part.description, `${part.name}-part`),
      control: "text",
      table: {
        category: "css shadow parts",
      },
    };
  });

  return parts;
}

export function getSlots(component?: Declaration): ArgTypes {
  const slots: ArgTypes = {};

  component?.slots?.forEach((slot) => {
    slots[slot.name] = {
      name: slot.name,
      table: {
        disable: true,
      },
    };

    const slotName = slot.name || "default";
    slots[`${slotName}-slot`] = {
      name: slotName,
      description: getDescription(slot.description, `${slotName}-slot`),
      control: "text",
      table: {
        category: "slots",
      },
    };
  });

  return slots;
}

function getControl(type?: string): ControlOptions {
  if (!type) {
    return "text";
  }

  if (type.includes("boolean")) {
    return "boolean";
  }

  if (type.includes("number") && !type.includes("string")) {
    return "number";
  }

  if (type.includes("Date")) {
    return "date";
  }

  const values = type.split("|");
  if (values.length > 1) {
    return values.length <= 4 ? "radio" : "select";
  }

  return "text";
}

function cleanUpType(type?: string): string {
  return !type ? "" : type.replace(" | undefined", "").replace(" | null", "");
}

function removeQuoteWrappers(value?: string) {
  return value?.trim().replace(/^["'](.+(?=["']$))["']$/, "$1");
}

function getDescription(description?: string, argRef?: string) {
  return description
    ? `${description}\n\narg ref - \`${argRef}\``
    : `arg ref - \`${argRef}\``;
}

export const getReactEventName = (eventName: string) =>
  `on${capitalizeFirstLetter(toCamelCase(eventName))}`;

function toCamelCase(value: string = "") {
  const arr = value.split("-");
  const capital = arr.map((item, index) =>
    index
      ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
      : item.toLowerCase()
  );
  return capital.join("");
}

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
