<template>
  <HomeLayout
    :skeleton="showSkeleton"
    :items="products"
    :all-items-length="totalProducts"
    :loading-more="loadingMore"
    @load-more-items="loadMoreProducts"
  >
    <template #skeleton>
      <v-row>
        <v-col v-for="i in 12" :key="'skeleton-' + i" cols="12" sm="6" md="4" lg="3" xl="2">
          <v-skeleton-loader type="card-avatar, actions"></v-skeleton-loader>
        </v-col>
      </v-row>
    </template>
    <template #items="{ items }">
      <v-row>
        <v-col v-for="product in items" :key="product.id" cols="12" sm="6" md="4" lg="3" xl="2">
          <ProductComponent :product="product" @view-details="openProductDetail(product)" />
        </v-col>
      </v-row>
    </template>
  </HomeLayout>

  <!-- Modal de detalles -->
  <ProductDetail :product="selectedProduct" ref="productDetailModal" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import HomeLayout from '@/layouts/HomeLayout.vue';
import ProductComponent from '@/components/ProductComponent.vue';
import ProductDetail from '@/components/ProductDetail.vue';
import { useProductStore } from '@/modules/products/store';
import { storeToRefs } from 'pinia';

// Store de productos
const productStore = useProductStore();
const { products, loading, pagination } = storeToRefs(productStore);
const { fetchProducts } = productStore;

// Variables reactivas
const selectedProduct = ref<any | null>(null); // Producto seleccionado para el modal
const productDetailModal = ref(null);
const currentPage = ref(1); // Página actual
const loadingMore = ref(false); // Estado de carga para "cargar más"

// Total de productos (calculado desde la paginación)
const totalProducts = computed(() => pagination.value?.total || 0);

// Determina si se debe mostrar el skeleton
const showSkeleton = computed(() => loading.value && products.value.length === 0);

// Cargar productos inicialmente
onMounted(async () => {
  await fetchProducts(currentPage.value); // Carga la primera página con 12 productos
});

// Cargar más productos
const loadMoreProducts = async () => {
  if (loadingMore.value) return;

  loadingMore.value = true;
  currentPage.value += 1; // Incrementa la página actual

  try {
    await fetchProducts(currentPage.value); // Carga la siguiente página
  } catch (error) {
    console.error('Error al cargar más productos:', error);
  } finally {
    loadingMore.value = false;
  }
};

// Abrir el modal de detalles
const openProductDetail = (product: any) => {
  selectedProduct.value = product; // Asignar el producto seleccionado
  productDetailModal.value.openModal(); // Abrir el modal
};
</script>