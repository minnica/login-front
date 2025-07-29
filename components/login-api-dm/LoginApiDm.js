import { LitElement } from 'lit';

export class LoginApiDm extends LitElement {
  static get is() {
    return 'login-api-dm';
  }

  static get properties() {
    return {
      test: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.test = 'Enrique';
  }

  async handleLogin(body) {
    try {
      const response = await fetch('http://localhost:3000/keysarCosmetics/login', {
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
        this.dispatchEvent(new CustomEvent('sales-api-dm-fetch-error', { detail: error }));
        return;
      }

      const data = await response.json();
      this.dispatchEvent(new CustomEvent('sales-api-dm-fetch', { detail: data }));
    } catch (error) {
      this.dispatchEvent(new CustomEvent('api-dm-error', { detail: error }));
    }
  }
}

customElements.define('login-api-dm', LoginApiDm);
