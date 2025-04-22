/**
 * Imports the `useAuth` composable and destructures its `login` and `register` methods.
 *
 * - `login`: A method used to authenticate a user with their credentials.
 * - `register`: A method used to create a new user account.
 *
 * These methods are provided by the `useAuth` composable, which is likely responsible
 * for handling authentication logic in the application.
 *
 * @module auth/api
 */
import { useAuth } from '@/composables/useAuth';
export const { login, register } = useAuth();
