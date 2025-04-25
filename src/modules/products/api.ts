import { useProducts } from '@/composables/useProduct';
/**
 * Fetches the list of products using the `useProduct` hook.
 * 
 * @constant
 * @type {Function}
 * @description This function is destructured from the `useProduct` hook and is used to retrieve product data.
 */
export const { fetchProducts } = useProducts();
