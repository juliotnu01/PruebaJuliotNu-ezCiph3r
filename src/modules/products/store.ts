import { defineStore } from 'pinia';
import { fetchProducts } from './api'; // Importa directamente desde tu archivo api

// Define el estado del store
interface ProductState {
  products: any[]; // Usa `any[]` si los tipos ya están manejados en el composable
  pagination: any | null; // Metadatos de paginación
  loading: boolean;
  error: string | null;
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [], // Lista de productos inicialmente vacía
    pagination: null, // Metadatos de paginación inicialmente nulos
    loading: false, // Estado de carga inicialmente falso
    error: null, // Mensaje de error inicialmente nulo
  }),
  getters: {
    getProductById: (state) => (id: number) => {
      return state.products.find((product) => product.id === id);
    },
    getPaginatedProducts: (state) => {
      return state.products; // Retorna la lista de productos paginados
    },
    getTotalPages: (state) => {
      return state.pagination?.last_page || 0; // Retorna el número total de páginas
    },
    getCurrentPage: (state) => {
      return state.pagination?.current_page || 1; // Retorna la página actual
    },
  },
  actions: {
    async fetchProducts(page: number = 1, perPage: number = 15) {
      this.loading = true; // Activa el estado de carga
      this.error = null; // Limpia errores previos

      try {
        const response = await fetchProducts(page, perPage); // Llama al endpoint

        // Si es la primera página, reemplaza los productos
        if (page === 1) {
          this.products = response.data;
        } else {
          // Si no es la primera página, agrega los nuevos productos
          this.products = [...this.products, ...response.data];
        }

        // Actualiza la paginación
        this.pagination = response.meta;

        console.log('Productos cargados:', this.products);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        this.error =
          'Error al cargar productos. Por favor, intenta nuevamente.';
      } finally {
        this.loading = false; // Desactiva el estado de carga
      }
    },
    addProduct(product: any) {
      this.products.push(product); // Agrega un producto a la lista
    },
    removeProduct(id: number) {
      this.products = this.products.filter((product) => product.id !== id); // Elimina un producto
    },
    updateProduct(updatedProduct: any) {
      const index = this.products.findIndex(
        (product) => product.id === updatedProduct.id,
      );
      if (index !== -1) {
        this.products[index] = updatedProduct; // Actualiza un producto existente
      }
    },
  },
});