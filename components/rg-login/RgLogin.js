import { LitElement, html } from "lit";

export class RgLogin extends LitElement {
  static get properties() {
    return {
      email: { type: String },
      password: { type: String },
    };
  }

  constructor() {
    super();
    this.email = "minnica";
    this.password = "";
  }

  render() {
    return html`<h1>Hola ${this.email}</h1>`;
  }
}

customElements.define("rg-login", RgLogin);
