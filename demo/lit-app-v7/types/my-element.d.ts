import { LitElement } from "lit";
export type Variant = "default" | "primary" | "success" | "neutral" | "warning" | "danger" | "text";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @slot button - This element has a slot
 * @csspart button - The button
 */
export declare class MyElement extends LitElement {
    /**
     * Copy for the read the docs hint.
     */
    docsHint: string;
    /** The button's theme variant. */
    variant: Variant;
    /**
     * @deprecated replaced by `docs-hint`
     * Copy for the read the docs hint.
     */
    oldDocsHint: string;
    /**
     * The number of times the button has been clicked.
     */
    count: number;
    render(): import("lit-html").TemplateResult<1>;
    private _onClick;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "my-element": MyElement;
    }
}
