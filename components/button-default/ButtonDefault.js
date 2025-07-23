import { LitElement, html } from "lit";

export class ButtonDefault extends LitElement {
  static get properties() {
    return {
      test: {
        type: String,
      },
    };
  }
  constructor() {
    super();
    this.test = "Enrique";
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<button class="text-sky-500 border-2 border-black">${this.test}</button>`;
  }
}

customElements.define("button-default", ButtonDefault);
