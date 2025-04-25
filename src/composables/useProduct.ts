import { apiClient } from '@/api';

interface User {
  id: number;
  uuid: string;
  name: string;
  address: string | null;
  phone: string | null;
  email: string;
  // Agrega aquí otros campos según la estructura del usuario
}

interface Offer {
  id: number;
  uuid: string;
  product_id: number;
  description: string | null;
  user_id: number;
  price: string;
  status: number;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  uuid: string;
  name: string;
  resumen: string;
  description: string;
  sku: string;
  nmp: string;
  width: string;
  height: string;
  weight: string;
  lenght: string;
  depth: string;
  price: string;
  make_offer: number;
  user: User;
  brands: any[]; // Ajusta esto si tienes una estructura específica para marcas
  offers: Offer[];
  categories: any[]; // Ajusta esto si tienes una estructura específica para categorías
  colors: any[]; // Ajusta esto si tienes una estructura específica para colores
  image: string | null;
  images: string[];
  stock: number;
  status: number;
  cart: number;
  favorite: number;
}

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

interface PaginatedResponse<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
  message: string;
  success: boolean;
}

/**
 * A composable function that provides product-related methods.
 *
 * @returns An object containing product-related methods such as `fetchProducts`.
 */
export const useProducts = () => {
  /**
   * Fetches a paginated list of products from the server.
   *
   * @param page - The page number to fetch (optional, defaults to 1).
   * @param perPage - The number of items per page (optional, defaults to 15).
   * @returns A promise that resolves with the paginated response.
   * @throws Will throw an error if the request fails.
   */
  const fetchProducts = async (
    page: number = 1,
    perPage: number = 15
  ): Promise<PaginatedResponse<Product>> => {
    try {
      const { data } = await apiClient<PaginatedResponse<Product>>('/products', {
        params: { page, per_page: perPage },
      });
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

  /**
   * Fetches a single product by its ID.
   *
   * @param productId - The ID of the product to fetch.
   * @returns A promise that resolves with the product details.
   * @throws Will throw an error if the request fails.
   */
  const fetchProductById = async (productId: number): Promise<Product> => {
    try {
      const { data } = await apiClient.get<Product>(`/products/${productId}`);
      return data;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  };

  return {
    fetchProducts,
    fetchProductById,
  };
};
