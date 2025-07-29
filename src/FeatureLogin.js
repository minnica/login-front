import { LitElement, html } from 'lit';
import './index.css';
import '@components/rg-login/RgLogin.js';
import '@components/login-api-dm/LoginApiDm.js';
import { FeatureLoginDm } from './FeatureLoginDm.js';
import './pages/feature-login-success-page/FeatureLoginSuccessPage.js';

export class FeatureLogin extends LitElement {
  static get properties() {
    return {
      authenticated: { type: Boolean },
      user: { type: Object },
      data: { type: Object },
    };
  }

  constructor() {
    super();
    this.authenticated = false;
    this.user = null;
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
    this.featureLoginDm.requestHandleLogin(this.data);
  }

  requestLogout() {
    this.featureLoginDm.requestHandleLogout();
  }

  successLoginFromDm() {
    this.featureLoginDm.requestHandleSession();
  }

  successSessionFromDm(e) {
    const { authenticated, user } = e.detail;
    this.authenticated = authenticated;
    this.user = user.name;
  }

  successLogoutFromDm() {
    this.authenticated = false;
    this.user = null;
  }

  render() {
    return html`
      ${this.authenticated
        ? html`<feature-login-success-page
            @feature-login-success-page-logout="${this.requestLogout}"
            .user=${this.user}
          ></feature-login-success-page>`
        : html`<rg-login @request-login="${e => this.requestLogin(e)}"> </rg-login>`}
      <feature-login-dm
        .dataToRequestLogin=${this.data}
        @set-data-from-dm="${this.successLoginFromDm}"
        @set-data-check-session="${e => this.successSessionFromDm(e)}"
        @logout-success="${e => this.successLogoutFromDm(e)}"
      ></feature-login-dm>
    `;
  }
}

customElements.define('feature-login', FeatureLogin);
