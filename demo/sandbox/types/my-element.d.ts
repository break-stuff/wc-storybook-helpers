import { LitElement } from "lit";
/**
 * An sample element.
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
 * @cssprop [--card-border-radius=8px] - The card border radius
 *
 * @event count - This is a custom event
 */
export declare class MyElement extends LitElement {
    /** Copy for the read the docs hint. */
    docsHint: string;
    /** The number of times the button has been clicked. */
    count?: number;
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
