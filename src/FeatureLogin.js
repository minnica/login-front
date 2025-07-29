import { LitElement, html } from 'lit';
import './index.css';
import '@components/button-default/ButtonDefault';
import '@components/rg-login/RgLogin.js';
import '@components/login-api-dm/LoginApiDm.js';
import { FeatureLoginDm } from './FeatureLoginDM.js';

export class FeatureLogin extends LitElement {
  static get properties() {
    return {
      test: { type: String },
      data: { type: Object },
    };
  }

  constructor() {
    super();
    this.email = 'minnica';
    this.password = '';
    this.data = {};
  }

  createRenderRoot() {
    return this;
  }

  _getElement(selector) {
    return this.renderRoot?.querySelector(selector) ?? this.querySelector(selector);
  }

  get featureLoginDm() {
    return this._getElement(FeatureLoginDm.is);
  }

  requestLogin(e) {
    this.data = e.detail;
    this.featureLoginDm.requestApiHandleLogin(this.data);
  }

  successDataFromDm(e) {
    this.test = e.detail;
  }

  render() {
    return html`
      <rg-login @request-login="${e => this.requestLogin(e)}"> </rg-login>
      <feature-login-dm
        @set-data-from-dm="${e => this.successDataFromDm(e)}"
        .dataToRequestLogin=${this.data}
      ></feature-login-dm>
      ${this.test}
    `;
  }
}

customElements.define('feature-login', FeatureLogin);
