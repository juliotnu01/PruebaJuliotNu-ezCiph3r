<script setup lang="ts"></script>
<template>
  <v-layout>
    <slot name="app-bar"></slot>
    <slot name="navigation-drawer"></slot>
    <v-main>
      <slot name="container"></slot>
    </v-main>
    <slot name="snackbar"></slot>
  </v-layout>
</template>
<style scoped></style>
