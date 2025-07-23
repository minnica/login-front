import { LitElement, html } from "lit";
import "./index.css";
import "@components/button-default/ButtonDefault";

export class FeatureLogin extends LitElement {
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

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="bg-red-500">
        <h1>Holis ${this.email}</h1>
        <button-default></button-default>
      </div>
    `;
  }
}

customElements.define("feature-login", FeatureLogin);
