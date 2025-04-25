import axios from 'axios';

/**
 * Creates an instance of Axios with predefined configuration.
 *
 * This client is configured to interact with the API at the specified base URL
 * and includes default headers for JSON content type. It also handles adding
 * the Bearer Token to authorized requests automatically.
 *
 * @constant
 * @type {AxiosInstance}
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add the Authorization header with the Bearer Token.
 */
apiClient.interceptors.request.use(
  (config) => {
    // Obtiene el token del localStorage
    const token = localStorage.getItem('token');

    // Si existe un token, lo agrega al encabezado Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Maneja errores de la solicitud
    return Promise.reject(error);
  },
);

/**
 * Response interceptor to handle unauthorized responses (e.g., token expired).
 */
apiClient.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, simplemente la retorna
    return response;
  },
  (error) => {
    // Si la respuesta tiene un error de autenticación (401 Unauthorized), maneja el caso
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized request. Token may be expired or invalid.');

      // Opcional: Redirige al usuario a la página de inicio de sesión o limpia el token
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirige al login
    }

    // Retorna el error para que pueda ser manejado por el código que llama a la API
    return Promise.reject(error);
  },
);
