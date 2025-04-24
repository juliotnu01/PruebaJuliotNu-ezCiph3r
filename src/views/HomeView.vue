<template>
  <HomeLayout
    :skeleton="loading"
    :items="displayedProducts"
    :all-items-length="allProducts.length"
    :loading-more="loadingMore"
    @load-more-items="loadMoreProducts"
  >
    <!-- Slot para el esqueleto -->
    <template #skeleton>
      <v-row>
        <v-col v-for="i in 12" :key="'skeleton-' + i" cols="12" sm="6" md="4" lg="3" xl="2">
          <v-skeleton-loader type="card-avatar, actions"></v-skeleton-loader>
        </v-col>
      </v-row>
    </template>

    <!-- Slot para los elementos -->
    <template #items="{ items }">
      <v-row>
        <v-col v-for="product in items" :key="product.id" cols="12" sm="6" md="4" lg="3" xl="2">
          <ProductComponent
            :product="product"
            @view-details="openProductDetail(product)"
          />
        </v-col>
      </v-row>
    </template>
  </HomeLayout>

  <!-- Modal de detalles -->
  <ProductDetail :product="selectedProduct" ref="productDetailModal" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import HomeLayout from '@/layouts/HomeLayout.vue';
import ProductComponent from '@/components/ProductComponent.vue';
import ProductDetail from '@/components/ProductDetail.vue';

// Interfaz para el usuario
interface User {
  name: string;
  rating: number;
  punctuation: number;
  avatar: string | null;
}

// Interfaz para el producto
interface Product {
  id: number;
  name: string;
  resumen: string;
  description: string;
  sku: string;
  images: string[];
  price: string;
  width: string;
  height: string;
  depth: string;
  weight: string;
  stock: number;
  categories: string[];
  colors: string[];
  user: User;
}

// Variables reactivas
const allProducts = ref<Product[]>([]);
const displayedProducts = ref<Product[]>([]);
const loadingMore = ref(false);
const loading = ref(true);
const selectedProduct = ref<Product | null>(null); // Producto seleccionado para el modal
const productDetailModal = ref(null);

// Simulación de carga inicial de productos
const loadInitialProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const initialData: Product[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Producto ${i + 1}`,
    resumen: `Resumen del Producto ${i + 1}`,
    description: `Descripción detallada del Producto ${i + 1}`,
    sku: `SKU-${i + 1}`,
    images: [`https://picsum.photos/200/300?random=${i + 1}`],
    price: `${Math.floor(Math.random() * 100) + 10}`,
    width: "112",
    height: "89",
    depth: "68",
    weight: "191",
    stock: Math.floor(Math.random() * 10) + 1,
    categories: [],
    colors: [],
    user: {
      name: "Administrador",
      rating: 2.62,
      punctuation: 72,
      avatar: null,
    },
  }));
  allProducts.value = initialData;
  displayedProducts.value = initialData.slice(0, 12); // Mostrar los primeros 12 productos
  loading.value = false;
};

// Cargar más productos
const loadMoreProducts = async () => {
  if (loadingMore.value) return;

  loadingMore.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));

  const nextProducts = allProducts.value.slice(
    displayedProducts.value.length,
    displayedProducts.value.length + 12,
  );

  if (nextProducts.length > 0) {
    displayedProducts.value.push(...nextProducts);
  }

  loadingMore.value = false;
};

// Abrir el modal de detalles
const openProductDetail = (product: Product) => {
  selectedProduct.value = product; // Asignar el producto seleccionado
  productDetailModal.value.openModal(); // Abrir el modal
};

onMounted(() => {
  loadInitialProducts();
});
</script>