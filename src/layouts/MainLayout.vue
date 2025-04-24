<script setup lang="ts"></script>
<template>
  <v-layout class="rounded rounded-md border">
    <slot name="app-bar"></slot>
    <slot name="navigation-drawer"></slot>
    <v-main class="d-flex align-center justify-center" height="100vh" style="overflow: hidden;">
      <slot name="container"></slot>
    </v-main>
    <slot name="snackbar"></slot>
  </v-layout>
</template>
<style scoped></style>
