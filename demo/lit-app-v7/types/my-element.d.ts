import { LitElement } from "lit";
export type Variant = "default" | "primary" | "success" | "neutral" | "warning" | "danger" | "text" | "number";
type DataObject = {
    test?: string;
    value?: string;
};
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @slot button - This element has a slot
 * @csspart button - The button
 * @csspart label - Adds custom styles to label
 *
 * @cssprop [--my-element-background-color=#ccc] - The background color
 * @cssprop --my-element-border-color - The border color
 *
 * @event {MyEventType} my-event - This is a custom event
 * @event untyped-event - This is a custom event without a type
 */
export declare class MyElement extends LitElement {
    /**
     * Copy for the read the docs hint.
     */
    docsHint: string;
    /** The button's theme variant. */
    variant: Variant;
    /** The button's theme variant. */
    dataObject?: DataObject;
    /**
     * @deprecated replaced by `docs-hint`
     * Copy for the read the docs hint.
     */
    oldDocsHint: string;
    /**
     * The number of times the button has been clicked.
     */
    count?: number;
    /**
     * An example with a type of string array.
     */
    values?: string[];
    /**
     * test property
     */
    test?: string;
    /** Test getter property */
    get validity(): string;
    /** Example without a type */
    noType: string;
    /** Adds a label to the component */
    label?: string;
    render(): import("lit-html").TemplateResult<1>;
    private _onClick;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "my-element": MyElement;
    }
}
export {};
