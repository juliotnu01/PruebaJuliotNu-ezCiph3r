<template>
    <v-dialog v-model="showDialog" max-width="800">
        <v-card>
            <!-- Encabezado del modal -->
            <v-card-title class="text-h5">{{ product.name }}</v-card-title>
            <v-card-subtitle>{{ product.resumen }}</v-card-subtitle>

            <!-- Carrusel de imágenes -->
            <v-carousel v-if="product.images.length > 0" height="400px" hide-delimiters cycle>
                <v-carousel-item v-for="(image, index) in product.images" :key="index">
                    <v-img :src="image" height="400px" cover></v-img>
                </v-carousel-item>
            </v-carousel>

            <!-- Imagen predeterminada si no hay imágenes -->
            <v-img v-else src="https://via.placeholder.com/400" height="400px" cover></v-img>

            <!-- Contenido del modal -->
            <v-card-text>
                <!-- Información del usuario -->
                <div class="d-flex align-center mb-4">
                    <v-avatar size="48" color="grey-darken-3" class="mr-2">
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

                <!-- Detalles adicionales -->
                <v-list>
                    <v-list-item>
                        <v-list-item-title><strong>SKU:</strong></v-list-item-title>
                        <v-list-item-subtitle>{{ product.sku }}</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title><strong>Precio:</strong></v-list-item-title>
                        <v-list-item-subtitle>${{ product.price }}</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title><strong>Dimensiones:</strong></v-list-item-title>
                        <v-list-item-subtitle>{{ product.width }} x {{ product.height }} x {{ product.depth
                            }}</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title><strong>Peso:</strong></v-list-item-title>
                        <v-list-item-subtitle>{{ product.weight }} kg</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title><strong>Stock:</strong></v-list-item-title>
                        <v-list-item-subtitle>{{ product.stock }}</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title><strong>Categorías:</strong></v-list-item-title>
                        <v-list-item-subtitle>{{ product.categories.join(', ') || 'Ninguna' }}</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-title><strong>Colores:</strong></v-list-item-title>
                        <v-list-item-subtitle>{{ product.colors.join(', ') || 'Ninguno' }}</v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </v-card-text>

            <!-- Acciones del modal -->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="closeModal">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface User {
    name: string;
    rating: number;
    punctuation: number;
    avatar: string | null;
}

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

// Props
const props = defineProps<{
    product: Product;
}>();

// Estado del modal
const showDialog = ref(false);

// Función para abrir el modal
const openModal = () => {
    showDialog.value = true;
};

// Función para cerrar el modal
const closeModal = () => {
    showDialog.value = false;
};

// Exponer la función para abrir el modal
defineExpose({
    openModal,
});
</script>