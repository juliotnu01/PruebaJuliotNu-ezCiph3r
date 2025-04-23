import { apiClient } from '@/api';

interface RegisterParams {
  email: string;
  name: string;
  password: string;
  c_password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

/**
 * A composable function that provides authentication-related methods.
 *
 * @returns An object containing `login` and `register` methods.
 */
export const useAuth = () => {
  /**
   * Logs in a user with the provided email and password.
   *
   * @param email - The email address of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves with the login response data of type T.
   * @throws Will throw an error if the login request fails.
   */

  const login = async ({ email, password }: LoginParams): Promise<T> => {
    try {
      const { data } = await apiClient.post<T>('/login', {
        email,
        password,
      });
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  /**
   * Registers a new user with the provided details.
   *
   * @template T - The type of the response data returned by the registration request.
   * @param email - The email address of the user.
   * @param name - The name of the user.
   * @param password - The password of the user.
   * @param c_password - The confirmation of the password.
   * @returns A promise that resolves with the registration response data of type T.
   * @throws Will throw an error if the registration request fails.
   */
  

  const register = async ({
    email,
    name,
    password,
    c_password,
  }: RegisterParams): Promise<T> => {
    try {
      const { data } = await apiClient.post<T>('/register', {
        email,
        name,
        password,
        c_password,
      });
      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  return { login, register };
};
