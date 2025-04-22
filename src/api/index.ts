import axios from 'axios';

/**
 * Creates an instance of Axios with predefined configuration.
 *
 * This client is configured to interact with the API at the specified base URL
 * and includes default headers for JSON content type. Use this client to make
 * HTTP requests to the API.
 *
 * @constant
 * @type {AxiosInstance}
 *
 * @property {string} baseURL - The base URL for the API. Replace with your actual API base URL.
 * @property {Record<string, string>} headers - Default headers for the HTTP requests.
 * @property {string} headers['Content-Type'] - Specifies that the content type is JSON.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
