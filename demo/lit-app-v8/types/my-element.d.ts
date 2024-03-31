import { LitElement } from "lit";
export type Variant = "default" | "primary" | "success" | "neutral" | "warning" | "danger" | "text" | "number";
type DataObject = {
    test?: string;
    value?: string;
};
/**
 * An example element.
 *
 * @slot - This adds content between the logo and the counter button
 * @slot button-content - This adds extra content into the counter button
 *
 * @csspart button - The button
 * @csspart docs-hint - Adds custom styles to the docs hint
 *
 * @cssprop [--card-border-color=#ccc] - The card border color
 * @cssprop [--card-border-size=1px] - The card border color
 * @cssprop [--card-border-style=solid] - The card border color
 *
 * @event count - This is a custom event
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
    private _onClick;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "my-element": MyElement;
    }
}
export {};
