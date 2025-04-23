<!-- src/App.vue -->
<script setup lang="ts">
import { RouterView } from 'vue-router'; // Para renderizar las vistas según las rutas
import { useGlobalStore } from './store'; // Importa el store global
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore(); // Accede al store global
const { snackbarVisible, snackbarColor, snackbarMessage } = storeToRefs(globalStore); // Desestructura las propiedades reactivas del store
</script>

<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>

    <!-- Snackbar dinámico -->
    <v-snackbar v-model="snackbarVisible" :color="snackbarColor" timeout="3000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-app>
</template>
