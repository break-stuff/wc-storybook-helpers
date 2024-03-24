import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import litLogo from "./assets/lit.svg";

export type Variant =
  | "default"
  | "primary"
  | "success"
  | "neutral"
  | "warning"
  | "danger"
  | "text"
  | "number";

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
@customElement("my-element")
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property({ attribute: "docs-hint", reflect: true })
  docsHint = "Click on the Vite and Lit logos to learn more";

  /** The button's theme variant. */
  @property({ reflect: true }) variant: Variant = "primary";

  /** The button's theme variant. */
  @property({ attribute: false }) dataObject?: DataObject = {};

  /**
   * @deprecated replaced by `docs-hint`
   * Copy for the read the docs hint.
   */
  @property({ attribute: "old-docs-hint", reflect: true })
  oldDocsHint = "Click on the Vite and Lit logos to learn more";

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number, reflect: true })
  count?: number = 0;
  
  /**
   * An example with a type of string array.
   */
  @property({ attribute: false })
  values?: string[] = [];

  /**
   * test property
   */
  @property({ attribute: false })
  test?: string;

  /** Test getter property */
  @property({ attribute: false })
  get validity(): string {
    return '';
  }

  /** Example without a type */
  @property({ attribute: false })
  noType = '';

  /** Adds a label to the component */
  @property()
  label?: string;

  render() {
    return html`
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          This is a test: ${this.test}
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">
          count is ${this.count}
          <slot name="button"></slot>
        </button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
    `;
  }

  private _onClick() {
    this.count!++;
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    h1 {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    // button {
    //   border-radius: 8px;
    //   border: 1px solid transparent;
    //   padding: 0.6em 1.2em;
    //   font-size: 1em;
    //   font-weight: 500;
    //   font-family: inherit;
    //   background-color: #1a1a1a;
    //   cursor: pointer;
    //   transition: border-color 0.25s;
    // }
    // button:hover {
    //   border-color: #646cff;
    // }
    // button:focus,
    // button:focus-visible {
    //   outline: 4px auto -webkit-focus-ring-color;
    // }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
