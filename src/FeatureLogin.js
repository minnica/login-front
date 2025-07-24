import { LitElement, html } from "lit";
import "./index.css";
import "@components/button-default/ButtonDefault";
import "@components/rg-login/RgLogin.js";

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
    return html` <rg-login></rg-login> `;
  }
}

customElements.define("feature-login", FeatureLogin);
