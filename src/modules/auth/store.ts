import { defineStore } from 'pinia';
import { login, register } from './api';
import { useGlobalStore } from '@/store'; // Asegúrate de que esta ruta sea correcta
import router from '@/router'; // Importa el enrutador
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
    isAuthenticated: !!localStorage.getItem('token'),
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
    /**
     * Handles the login process for a user.
     *
     * This asynchronous method attempts to log in a user using the provided credentials.
     * If successful, it saves the authentication token and user data, updates the authentication state,
     * and displays a success message using a global snackbar. If the login attempt fails, it catches
     * the error, logs it, and displays an error message using the global snackbar.
     *
     * @async
     * @returns {Promise<void>} A promise that resolves when the login process is complete.
     * @throws {Error} If an error occurs during the login attempt.
     *
     *
     */
    async loginUser() {
      this.loading = true;
      try {
        let { data }: { data: AuthResponseData } = await login(this.user);
        if (data.token && data.user) {
          this.saveToken(data.token);
          this.saveUser(data.user);
          this.setAuthenticationStatus(true)

          // Configuración del snackbar
          const globalStore = useGlobalStore();

          globalStore.snackbarColor = 'success';
          globalStore.snackbarMessage = 'Login successful!';
          globalStore.snackbarVisible = true;
          router.push({ name: 'home.view' });
        }
      } catch (error) {
        console.error('Error during login attempt:', error);
        const globalStore = useGlobalStore();
        globalStore.snackbarColor = 'error';
        globalStore.snackbarMessage = 'Login failed. Please try again.';
        globalStore.snackbarVisible = true;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Handles the user registration process.
     *
     * This asynchronous method attempts to register a user using the provided
     * `userRegister` data. During the process, it updates the `loadingRegister`
     * state to indicate the ongoing operation. Upon successful registration,
     * it configures a global snackbar to display a success message. If an error
     * occurs during registration, it logs the error to the console and configures
     * the snackbar to display an error message. The `loadingRegister` state is
     * reset to `false` once the operation completes, regardless of success or failure.
     *
     * @async
     * @throws Will log an error to the console if the registration process fails.
     */
    async registerUser() {
      this.loadingRegister = true;
      try {
        await register(this.userRegister);

        // Configuración del snackbar
        const globalStore = useGlobalStore();
        globalStore.snackbarColor = 'success';
        globalStore.snackbarMessage = 'Registration successful!';
        globalStore.snackbarVisible = true;
        router.push({ name: 'home.view' });
      } catch (error) {
        console.error('Error during registration attempt:', error);
        const globalStore = useGlobalStore();
        globalStore.snackbarColor = 'error';
        globalStore.snackbarMessage = 'Registration failed. Please try again.';
        globalStore.snackbarVisible = true;
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
    setAuthenticationStatus(status: boolean) {
      localStorage.setItem('isAuthenticated', JSON.stringify(status));
      this.isAuthenticated = status || JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
    },
  },

  getters: {
    isLoggedIn: (state) => state.isAuthenticated
  },
});
