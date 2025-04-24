<template>
    <v-card class="product-card" elevation="2">
        <!-- Carrusel de imágenes -->
        <v-carousel v-if="product.images.length > 0" height="200px" hide-delimiters cycle>
            <v-carousel-item v-for="(image, index) in product.images" :key="index">
                <v-img :src="image" height="200px" cover></v-img>
            </v-carousel-item>
        </v-carousel>

        <!-- Imagen predeterminada si no hay imágenes -->
        <v-img v-else src="https://via.placeholder.com/200" height="200px" cover></v-img>

        <v-card-text>
            <!-- Información del usuario -->
            <div class="d-flex align-center mb-2">
                <v-avatar size="30" color="grey-darken-3" class="mr-2">
                    <v-img v-if="product.user.avatar" :src="product.user.avatar"></v-img>
                    <v-icon v-else>mdi-account-circle</v-icon>
                </v-avatar>

                <div>
                    <span class="font-weight-bold">{{ product.user.name }}</span>
                    <div class="d-flex align-center">
                        <v-rating :model-value="product.user.rating" color="amber" density="compact" half-increments
                            readonly size="small"></v-rating>
                        <span class="ml-1 caption">{{ product.user.punctuation }} puntos</span>
                    </div>
                </div>
            </div>

            <!-- Nombre y resumen del producto -->
            <v-card-title class="text-subtitle-1 py-1">{{ product.name }}</v-card-title>
            <v-card-subtitle class="text-body-2 py-0">{{ product.resumen }}</v-card-subtitle>

            <!-- Precio -->
            <div class="d-flex justify-space-between align-center mb-4">
                <span class="font-weight-bold text-h6">${{ product.price }}</span>
            </div>

            <!-- Botones con tooltips -->
            <v-row dense>
                <v-col cols="4">
                    <v-tooltip location="top" text="Agrega al carrito">
                        <template #activator="{ props }">
                            <v-btn v-bind="props" color="primary" block @click="addToCart">
                                <v-icon left>mdi-cart</v-icon>
                            </v-btn>
                        </template>
                    </v-tooltip>
                </v-col>
                <v-col cols="4">
                    <v-tooltip location="top" text="Compra ahora">
                        <template #activator="{ props }">
                            <v-btn v-bind="props" color="success" block @click="buyNow">
                                <v-icon left>mdi-shopping</v-icon>
                            </v-btn>
                        </template>
                    </v-tooltip>
                </v-col>
                <v-col cols="4">
                    <v-tooltip location="top" text="Ver detalle">
                        <template #activator="{ props }">
                            <v-btn v-bind="props" color="success" block @click="viewDetails">
                                <v-icon left>mdi-eye</v-icon>
                            </v-btn>
                        </template>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
interface User {
    name: string;
    rating: number;
    punctuation: number;
    avatar: string | null;
}

interface Product {
    name: string;
    resumen: string;
    description: string;
    sku: string;
    images: string[];
    price: string;
    user: User;
}

// Props
const props = defineProps<{
    product: Product;
}>();

// Emitir eventos
const emit = defineEmits<{
    (event: 'add-to-cart'): void;
    (event: 'buy-now'): void;
}>();

// Función para agregar al carrito
const addToCart = () => {
    emit('add-to-cart');
};

// Función para comprar ahora
const buyNow = () => {
    emit('buy-now');
};
// Función para comprar ahora
const viewDetails = () => {
    emit('view-details');
};
</script>

<style scoped>
.product-card {
    transition: transform 0.3s ease;
}

.product-card:hover {
    transform: scale(1.02);
}
</style>