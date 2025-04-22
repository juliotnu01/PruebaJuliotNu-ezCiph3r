import { defineStore } from 'pinia';
import { login } from './api';

export interface User {
  id: number;
  uuid: string;
  name: string;
  email: string;
  avatar: string | null;
  address: string;
  phone: string;
  status: number;
  punctuation: number;
  bulk_products: number;
  bulk_offer: number;
  role_id: number;
  password?: string; // El password podría no estar siempre presente en la respuesta
  rating: number;
}

export interface AuthResponseData {
  token: string;
  name: string;
  email: string;
  user: User;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string | null;
    password: string | null;
  };
  loading: boolean;
}

/**
 * Auth store for managing authentication state.
 *
 * This store provides state, actions, and getters for handling user authentication
 * and user information in the application.
 */
export const useAuthStore = defineStore('auth', {
  /**
   * State of the auth store.
   *
   * @returns {AuthState} The initial state of the auth store.
   * - `isAuthenticated`: A boolean indicating if the user is authenticated.
   * - `user`: An object containing user information:
   *   - `id`: The user's unique identifier (or `null` if not logged in).
   *   - `name`: The user's name (or `null` if not logged in).
   */
  state: (): AuthState => ({
    isAuthenticated: false,
    user: {
      email: 'admin@mail.com',
      password: '1q2w3e4r',
    },
    loading: false,
  }),

  actions: {
    /**
     * Logs in the user by updating the authentication state and user information.
     *
     * @param {Object} user - The user object containing authentication details.
     * @param {string} user.email - The unique identifier of the user.
     * @param {string} user.password - The password of the user.
     */
    async loginUser() {
      this.loading = true;
      try {
        let { data }: { data: AuthResponseData } = await login(this.user);
        if (data.token && data.user) {
          this.saveToken(data.token);
          this.saveUser(data.user);
          this.isAuthenticated = true;
        }
      } catch (error) {
        console.error('Error during login attempt:', error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Logs out the user by resetting the authentication state and clearing user information.
     */
    logout() {
      this.isAuthenticated = false;
    },
    /**
     * Saves the login token to localStorage.
     *
     * @param {string} token - The token to be saved.
     */
    saveToken(token: string) {
      localStorage.setItem('token', token);
    },
    /**
     * Saves the user object to localStorage.
     *
     * @param {User} user - The user object to be saved.
     */
    saveUser(user: User) {
      localStorage.setItem('user', JSON.stringify(user));
    },
  },

  getters: {
    /**
     * Getter to check if the user is logged in.
     *
     * @param {AuthState} state - The current state of the auth store.
     * @returns {boolean} `true` if the user is authenticated, otherwise `false`.
     */
    isLoggedIn: (state) => state.isAuthenticated,
  },
});
