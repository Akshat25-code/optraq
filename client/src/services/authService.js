// Authentication Service
// Handles user authentication with MongoDB backend
// Auth tokens are httpOnly cookies â€” managed by browser, not JS.

import { API_ENDPOINTS, API_BASE_URL } from '@/config';

class AuthService {
  constructor() {
    this.userKey = 'user_info';
    this.tokenKey = 'access_token';
    this.refreshTokenKey = 'refresh_token';
  }

  // Get stored access token for Authorization: Bearer fallback
  getAccessToken() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      return window.localStorage.getItem(this.tokenKey);
    } catch {
      return null;
    }
  }

  // Generate auth headers with Bearer token when available
  getAuthHeaders(extra = {}) {
    const headers = { ...extra };
    const token = this.getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // Persist user and tokens for resilient session management
  saveSession(data) {
    if (!data) return;
    if (data.user) {
      this.saveUserInfo(data.user);
    }
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (data.access_token) {
          window.localStorage.setItem(this.tokenKey, data.access_token);
        }
        if (data.refresh_token) {
          window.localStorage.setItem(this.refreshTokenKey, data.refresh_token);
        }
      }
    } catch {
      // ignore in test/restricted environments
    }
  }

  // Open OAuth popup and wait for tokens via postMessage
  openOAuthPopup(url) {
    return new Promise((resolve, reject) => {
      const popup = window.open(url, 'oauth_popup', 'width=500,height=650');
      if (!popup) {
        reject(new Error('Popup blocked. Please allow popups for this site in your browser.'));
        return;
      }

      let received = false;

      const timeout = setTimeout(() => {
        window.removeEventListener('message', onMessage);
        try { popup.close(); } catch (_e) { /* popup may already be closed */ }
        if (!received) reject(new Error('Login timed out'));
      }, 60000);

      const closePoll = setInterval(() => {
        let isClosed = false;
        try {
          isClosed = Boolean(popup && popup.closed);
        } catch (_e) {
          // Cross-Origin-Opener-Policy (COOP) may restrict window.closed access across origins.
          // Do not fail early while OAuth redirect handshake is completing.
          return;
        }

        if (isClosed) {
          clearInterval(closePoll);
          // Allow message queue to finish dispatching before concluding user closed it
          setTimeout(() => {
            if (!received) {
              clearTimeout(timeout);
              window.removeEventListener('message', onMessage);
              reject(new Error('Popup closed'));
            }
          }, 350);
        }
      }, 400);

      const onMessage = (event) => {
        try {
          // Only accept messages from our backend origin or current page origin
          const apiUrl = new URL(API_BASE_URL);
          const expectedOrigin = `${apiUrl.protocol}//${apiUrl.host}`;
          const accepted = new Set([expectedOrigin, window.location.origin]);
          const [hostName, port] = apiUrl.host.split(":");
          if (hostName === 'localhost') {
            accepted.add(`${apiUrl.protocol}//127.0.0.1:${port || '80'}`);
          }
          if (hostName === '127.0.0.1') {
            accepted.add(`${apiUrl.protocol}//localhost:${port || '80'}`);
          }
          if (!accepted.has(event.origin)) {
            return;
          }
        } catch (_e) { /* origin URL parse failed — skip message */ }
        const data = event.data;
        if (!data || data.source !== 'oauth') return;
        received = true;
        window.removeEventListener('message', onMessage);
        clearTimeout(timeout);
        clearInterval(closePoll);
        try { popup.close(); } catch (_e) { /* popup may already be closed or COOP restricted */ }
        resolve(data.payload);
      };

      window.addEventListener('message', onMessage);
    });
  }

  // Social login using popup mode
  async loginWithProvider(provider) {
    try {
      const supportedProviders = new Set(['google', 'github']);
      if (!supportedProviders.has(provider)) {
        return { success: false, error: `${provider} login is disabled` };
      }
      const returnTo = window.location.origin;
      const startUrl = `${API_BASE_URL}/auth/oauth/${provider}/start?mode=popup&redirect_uri=${encodeURIComponent(returnTo)}`;
      const result = await this.openOAuthPopup(startUrl);
      this.saveSession(result);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message || 'Social login failed' };
    }
  }

  // Get user info from localStorage (NOT tokens — just display data)
  getUserInfo() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      const userInfo = window.localStorage.getItem(this.userKey);
      return userInfo ? JSON.parse(userInfo) : null;
    } catch {
      return null;
    }
  }

  // Store user info for display
  saveUserInfo(userInfo) {
    try {
      if (typeof window !== 'undefined' && window.localStorage && userInfo) {
        window.localStorage.setItem(this.userKey, JSON.stringify(userInfo));
      }
    } catch {
      // ignore in test/restricted environments
    }
  }

  // Clear user info and tokens
  clearUserInfo() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(this.userKey);
        window.localStorage.removeItem(this.tokenKey);
        window.localStorage.removeItem(this.refreshTokenKey);
      }
    } catch {
      // ignore
    }
  }

  // Check if user is authenticated (local check — verify with getUserProfile for certainty)
  isAuthenticated() {
    return !!this.getUserInfo();
  }

  // Register new user
  async register(userData) {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_REGISTER, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        this.saveSession(data);
        return { success: true, data };
      } else {
        return { success: false, error: data.detail || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error during registration' };
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_LOGIN, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        this.saveSession(data);
        return { success: true, data };
      } else {
        return { success: false, error: data.detail || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error during login' };
    }
  }

  // Logout user
  async logout() {
    try {
      await fetch(API_ENDPOINTS.AUTH_LOGOUT, {
        method: 'POST',
        credentials: 'include',
        headers: this.getAuthHeaders({ 'Content-Type': 'application/json' }),
      });
    } catch (error) {
      console.warn('Logout request failed:', error);
    }

    this.clearUserInfo();
    return { success: true };
  }

  // Get user profile (uses httpOnly cookie + Authorization: Bearer fallback)
  async getUserProfile() {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_ME, {
        credentials: 'include',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.clearUserInfo();
          return { success: false, error: 'Authentication expired' };
        }
        const data = await response.json().catch(() => ({}));
        return { success: false, error: data.detail || 'Failed to get user profile' };
      }

      const data = await response.json();
      this.saveUserInfo(data);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Network error during profile fetch' };
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const form = new URLSearchParams();
      form.append('email', email);
      const response = await fetch(API_ENDPOINTS.AUTH_FORGOT_PASSWORD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: form.toString(),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        return { success: true, message: data.message || 'If the email exists, reset instructions were sent.' };
      }
      return { success: false, error: data.detail || 'Failed to request password reset' };
    } catch (error) {
      return { success: false, error: 'Network error during password reset request' };
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_RESET_PASSWORD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: newPassword })
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        return { success: true, message: data.message || 'Password reset successful' };
      }
      return { success: false, error: data.detail || 'Failed to reset password' };
    } catch (e) {
      return { success: false, error: 'Network error during password reset' };
    }
  }

  // Helper: simple email login
  async smartLogin(identifier, password) {
    return this.login({ email: identifier, password });
  }

  // Make authenticated API request (uses httpOnly cookies + Bearer token fallback)
  async authenticatedRequest(url, options = {}) {
    const headers = this.getAuthHeaders({
      'Content-Type': 'application/json',
      ...options.headers,
    });

    let response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (response.status === 401) {
      this.clearUserInfo();
      throw new Error('Authentication expired');
    }

    return response;
  }
}

// Create singleton instance
const authService = new AuthService();
export default authService;

