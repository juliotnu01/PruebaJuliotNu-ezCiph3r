import { defineStore } from 'pinia';
import { login, register } from './api';

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
  password?: string;
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
  userRegister: {
    email: string;
    name: string;
    password: string;
    c_password: string;
  };
  loading: boolean;
  loadingRegister: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: {
      email: 'admin@mail.com',
      password: '1q2w3e4r',
    },
    userRegister: {
      email: 'kevinalbertoperez@gmail.com',
      name: 'Kevin Perez',
      password: '1q2w3e4r',
      c_password: '1q2w3e4r',
    },
    loading: false,
    loadingRegister: false,
  }),

  actions: {
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

    async registerUser() {
      this.loadingRegister = true;
      try {
        await register(this.userRegister);
      } catch (error) {
        console.error('Error during registration attempt:', error);
      } finally {
        this.loadingRegister = false;
      }
    },

    logout() {
      this.isAuthenticated = false;
    },

    saveToken(token: string) {
      localStorage.setItem('token', token);
    },

    saveUser(user: User) {
      localStorage.setItem('user', JSON.stringify(user));
    },
  },

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
  },
});
