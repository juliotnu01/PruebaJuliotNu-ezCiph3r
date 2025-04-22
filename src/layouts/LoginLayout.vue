<template>
  <v-layout class="rounded rounded-md border">
    <v-main class="d-flex align-center justify-center" style="height: 99vh">
      <v-container>
        <slot name="container"></slot>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
// Este script está vacío porque el componente no necesita lógica adicional.
</script>

<style scoped>
/* Estilos específicos del layout, si es necesario */
</style>
