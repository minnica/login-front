import { LitElement } from 'lit';

export class LoginApiDm extends LitElement {
  static get is() {
    return 'login-api-dm';
  }

  static get properties() {
    return {
      authenticated: { type: Boolean },
      user: { type: Object },
      test: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.authenticated = false;
    this.user = null;
    this.test = 'Enrique';
  }

  async handleLogin(body) {
    try {
      const response = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: body.email,
          password: body.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        this.dispatchEvent(new CustomEvent('login-api-dm-fetch-error', { detail: error }));
        return;
      }

      const data = await response.json();
      this.dispatchEvent(new CustomEvent('login-api-dm-fetch', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('login-api-dm-error', { detail: error }));
    }
  }

  async handleLogout() {
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(new CustomEvent('logout-api-dm-fetch-error', { detail: error }));
        return;
      }

      const data = await res.json();
      this.dispatchEvent(new CustomEvent('logout-api-dm-fetch', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('logout-api-dm-error', { detail: error }));
    }
  }

  async handleSession() {
    try {
      const res = await fetch('https://keysarcosmetics.fly.dev/keysarCosmetics/verify-token', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        const error = await res.json();
        this.dispatchEvent(new CustomEvent('session-api-dm-fetch-error', { detail: error }));
        return;
      }

      const data = await res.json();
      this.dispatchEvent(new CustomEvent('session-api-dm-fetch', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('session-api-dm-error', { detail: error }));
    }
  }
}

customElements.define('login-api-dm', LoginApiDm);
