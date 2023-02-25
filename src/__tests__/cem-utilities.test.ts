import cem from "./custom-elements.json" assert { type: "json" };
import {
  getComponentByTagName,
  getCssParts,
  getCssProperties,
  getAttributesAndProperties,
  getReactEventName,
  getReactEvents,
  getReactProperties,
  getSlots,
} from "../cem-utilities.js";

describe("getComponentByTagName", () => {
  test("should get components from custom-elements config", () => {
    // Arrange

    // Act
    const result = getComponentByTagName("my-switch", cem);

    // Assert
    expect(result).toBeDefined();
  });
});

describe("getAttributesAndProperties", () => {
  test("should return an object with 22 updated args for `my-switch` component", () => {
    // Arrange
    const component = getComponentByTagName("my-switch", cem);

    // Act
    const result = getAttributesAndProperties(component);

    // Assert
    expect(Object.keys(result).length).toBe(22);
  });

  test("should disable existing attribute and provide a namespaced attribute", () => {
    // Arrange
    const component = getComponentByTagName("my-switch", cem);

    // Act
    const result = getAttributesAndProperties(component);

    // Assert
    expect(result["label"].table?.disable).toBe(true);
    expect(result["label-attr"]).toBeDefined();
  });

  test("should return an object with 22 properties for `my-switch` component where 14 are disabled and 8 are enabled", () => {
    // Arrange
    const component = getComponentByTagName("my-switch", cem);
    let enabled = 0;
    let disabled = 0;

    // Act
    const result = getAttributesAndProperties(component);
    Object.keys(result).forEach((key) => {
      if (result[key].table?.disable) {
        disabled++;
      } else {
        enabled++;
      }
    });

    // Assert
    expect(enabled).toBe(8);
    expect(disabled).toBe(14);
  });
});

describe("getReactProperties", () => {
  test("should return an object with 8 React props for `my-switch` component", () => {
    // Arrange
    const component = getComponentByTagName("my-switch", cem);
    let enabled = 0;
    let disabled = 0;

    // Act
    const result = getReactProperties(component);    
    Object.keys(result).forEach((key) => {
      if (result[key].table?.disable) {
        disabled++;
      } else {
        enabled++;
      }
    });

    // Assert
    expect(enabled).toBe(8);
    expect(disabled).toBe(6);
  });
});

describe("getReactEvents", () => {
  test("should return an object with 4 React events for `my-switch` component", () => {
    // Arrange
    const component = getComponentByTagName("my-switch", cem);

    // Act
    const result = getReactEvents(component);    

    // Assert
    expect(Object.keys(result).length).toBe(3);
  });
});

describe("getCssProperties", () => {
  test("should return an object with 3 CSS Properties for `my-switch` component", () => {
    // Arrange
    const component = getComponentByTagName("my-switch", cem);

    // Act
    const result = getCssProperties(component);    

    // Assert
    expect(Object.keys(result).length).toBe(3);
  });
});

describe("getCssParts", () => {
  test("should return an object with 8 CSS Parts for `my-switch` component and 4 should be inactive", () => {
    // Arrange
    const component = getComponentByTagName("my-switch", cem);
    let disabledCount = 0;

    // Act
    const result = getCssParts(component); 
    Object.keys(result).forEach((key) => {
      if (result[key].table?.disable) {
        disabledCount++;
      }
    }); 

    // Assert
    expect(Object.keys(result).length).toBe(8);
    expect(disabledCount).toBe(4);
  });
});

describe("getSlots", () => {
  test("should return an object with 6 slots for `my-switch` component and 4 should be inactive", () => {
    // Arrange
    const component = getComponentByTagName("my-switch", cem);
    let disabledCount = 0;

    // Act
    const result = getSlots(component); 
    Object.keys(result).forEach((key) => {
      if (result[key].table?.disable) {
        disabledCount++;
      }
    }); 

    // Assert
    expect(Object.keys(result).length).toBe(6);
    expect(disabledCount).toBe(3);
  });
});

describe("getReactEventName", () => {
  test("should return `onMyEvent` when given the event name `my-event`", () => {
    // Arrange
    const component = getComponentByTagName("my-switch", cem);
    let disabledCount = 0;

    // Act
    const result = getReactEventName('my-event'); 

    // Assert
    expect(result).toBe('onMyEvent');
  });
});

