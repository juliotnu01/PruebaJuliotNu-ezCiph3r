<!-- src/App.vue -->
<script setup lang="ts">
import { RouterView } from 'vue-router'; // Para renderizar las vistas según las rutas
</script>

<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
