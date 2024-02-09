export interface Options {
  /** hides the `arg ref` label on each control */
  hideArgRef?: boolean;
  /** sets the custom type reference in the Custom Elements Manifest */
  typeRef?: string;
  /**
   * doesn't render attributes when their value is equal to the default value
   * of that attribute
   */
  renderDefaultAttributeValues?: boolean;
}

export interface ArgTypes {
  [key: string]: ArgSettings;
}

interface ArgSettings {
  /** The name of the property. */
  name: string;
  type?: ArgSettingsType;
  defaultValue?: string | boolean | number | object;
  /** Sets a Markdown description for the property. */
  description?: string;
  table?: Table;
  control?: Control | ControlOptions;
  options?: string[];
}

interface ArgSettingsType {
  /** Sets a type for the property. */
  name?: string;
  /** Sets the property as optional or required. */
  required?: boolean;
}

interface Table {
  type?: TableType;
  defaultValue?: TableDefaultValue;
  /** Removes control from table. */
  disable?: boolean;
  /** Assigns control to control group */
  category?: 'slots' | 'attributes' | 'css properties' | 'css shadow parts' | 'events' | 'properties' | 'methods';
  /** Assigns the argTypes to a specific subcategory */
  subcategory?: string;
}

interface TableType {
  /** Provide a short version of the type. */
  summary?: string;
  /** Provides an extended version of the type. */
  detail?: string;
}

interface TableDefaultValue {
  /** Provide a short version of the default value. */
  summary?: string;
  /** Provides a longer version of the default value. */
  detail?: string;
}

interface Control {
  type: ControlOptions;
  min?: number;
  max?: number;
  step?: number;
  accept?: string;
}

type ControlOptions =
  | 'text'
  | 'radio'
  | 'select'
  | 'boolean'
  | 'number'
  | 'color'
  | 'date'
  | 'object'
  | 'file'
  | 'inline-radio'
  | 'check'
  | 'inline-check'
  | 'multi-select'
  | null;
