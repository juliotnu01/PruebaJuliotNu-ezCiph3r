import { apiClient } from '@/api';

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
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<T> => {
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

  const register = async (email: string, password: string): Promise<T> => {
    // Implementation here
  };

  return { login, register };
};
