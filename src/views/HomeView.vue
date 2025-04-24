<template>
  <v-container fluid class="product-container">
    <!-- Contenedor principal -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-btn block color="secondary" @click="toggleSkeleton" :loading="loadingSkeleton" :disabled="loadingSkeleton">
          {{ showSkeleton ? 'Ocultar Skeleton' : 'Mostrar Skeleton' }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- Skeleton Loader -->
    <v-row v-if="showSkeleton">
      <v-col v-for="i in itemsPerPage" :key="'skeleton-' + i" cols="12" sm="6" md="4" lg="3" xl="2">
        <v-skeleton-loader type="card-avatar, actions"></v-skeleton-loader>
      </v-col>
    </v-row>

    <!-- Contenido real -->
    <v-row v-else>
      <v-col v-for="(product, index) in displayedProducts" :key="product.id" cols="12" sm="6" md="4" lg="3" xl="2">
        <!-- Tarjeta de producto -->
        <v-card class="product-card" elevation="2">
          <v-img :src="product.image" height="200px" cover class="rounded-t"></v-img>
          <v-card-title class="text-subtitle-1">{{ product.name }}</v-card-title>
          <v-card-subtitle class="font-weight-bold">${{ product.price }}</v-card-subtitle>
          <v-card-actions class="d-flex justify-space-between align-center">
            <v-btn color="primary" @click="addToCart(product)" size="small">
              Añadir al carrito
            </v-btn>
            <v-btn variant="text" color="secondary" size="small" @click="viewDetails(product)">
              Ver detalles
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Carga infinita -->
    <v-infinite-scroll v-if="!showSkeleton && displayedProducts.length < allProducts.length" :loading="loadingMore"
      @load="loadMoreProducts" :threshold="300" scroll-target=".product-container">
      <template v-slot:loading>
        <v-row justify="center" class="mt-4">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>
      </template>
    </v-infinite-scroll>

    <!-- Mensaje cuando no hay más productos -->
    <v-row v-if="!showSkeleton && displayedProducts.length === allProducts.length" justify="center" class="mt-4">
      <v-col cols="12" class="text-center">
        <p>No hay más productos disponibles.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const allProducts = ref<Product[]>([]);
const displayedProducts = ref<Product[]>([]);
const loadingMore = ref(false);
const itemsPerPage = ref(1000);
const page = ref(1);

// Estados para el skeleton
const showSkeleton = ref(false);
const loadingSkeleton = ref(false);

// Simulación de carga inicial de productos (más items)
const loadInitialProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const initialData: Product[] = Array.from({ length: 100000 }, (_, i) => ({
    id: i + 1,
    name: `Producto ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 10,
    image: `https://picsum.photos/200/300?random=${i + 1}`,
  }));
  allProducts.value = initialData;
  displayedProducts.value = allProducts.value.slice(0, itemsPerPage.value);
};

// Cargar más productos
const loadMoreProducts = async () => {
  console.log('Loading more products...');

  if (loadingMore.value) return;
  loadingMore.value = true;

  // Simula un pequeño retraso para la carga
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Calcular el índice de inicio
  const startIndex = page.value * itemsPerPage.value;
  const nextProducts = allProducts.value.slice(startIndex, startIndex + itemsPerPage.value);

  if (nextProducts.length > 0) {
    displayedProducts.value.push(...nextProducts);
    page.value++;
  }

  loadingMore.value = false;
};

// Función para añadir al carrito
const addToCart = (product: Product) => {
  alert(`Producto "${product.name}" añadido al carrito.`);
};

// Función para ver detalles del producto
const viewDetails = (product: Product) => {
  alert(`Detalles del producto "${product.name}":\nPrecio: $${product.price}`);
};

// Función para alternar el skeleton
const toggleSkeleton = async () => {
  loadingSkeleton.value = true;
  showSkeleton.value = !showSkeleton.value;

  // Simula un pequeño retraso para que se vea el estado de carga
  await new Promise((resolve) => setTimeout(resolve, 500));
  loadingSkeleton.value = false;
};

onMounted(() => {
  loadInitialProducts();
});
</script>

<style scoped>
/* Estilos para el contenedor principal */
.product-container {
  overflow-y: auto !important;
  max-height: 80vh !important;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.product-container::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari and Opera */
}

/* Estilos para las tarjetas de productos */
.product-card {
  transition: transform 0.2s ease-in-out;
}

.product-card:hover {
  transform: scale(1.02);
}

/* Espaciado adicional */
.v-card__actions {
  padding: 12px;
}
</style>