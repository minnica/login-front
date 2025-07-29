import { LitElement, html } from 'lit';
import { LoginApiDm } from '../components/login-api-dm/index.js';

export class FeatureLoginDm extends LitElement {
  static get is() {
    return 'feature-login-dm';
  }

  static get properties() {
    return {
      test: {
        type: String,
      },
      dataToRequestLogin: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this.test = 'Hola mundo desde FeatureLoginDM';
    this.dataToRequestLogin = {};
  }

  _getElement(selector) {
    return this.renderRoot?.querySelector(selector) ?? this.querySelector(selector);
  }

  get loginApiDm() {
    return this._getElement(LoginApiDm.is);
  }

  requestApiHandleLogin(bodyToRequest) {
    this.loginApiDm.handleLogin(bodyToRequest);
  }

  successData(e) {
    this.dataToRequestLogin = e.detail;
    this.dispatchEvent(new CustomEvent('set-data-from-dm', { detail: this.dataToRequestLogin }));
  }

  render() {
    return html`
      <h1>${this.test}</h1>
      <login-api-dm
        @sales-api-dm-fetch="${e => this.successData(e)}"
        @sales-api-dm-fetch-error=""
        @api-dm-error=""
      >
      </login-api-dm>
    `;
  }
}

customElements.define('feature-login-dm', FeatureLoginDm);
