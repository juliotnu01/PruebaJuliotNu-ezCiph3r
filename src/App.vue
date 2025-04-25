<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';
import { storeToRefs } from 'pinia';

// Global store
import { useGlobalStore } from '@/store';
// Login store
import { useAuthStore } from '@/modules/auth/store';

const globalStore = useGlobalStore();
const { snackbarVisible, snackbarColor, snackbarMessage } =
  storeToRefs(globalStore);

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);
const { logout } = authStore

const drawer = ref(true);
</script>

<template>
  <v-app>
    <MainLayout>
      <template #app-bar v-if="isLoggedIn">
        <v-app-bar density="compact">
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title class="text-h6">ciph3r</v-toolbar-title>
          <template v-slot:append>
            <v-btn block color="#cecece" @click="logout"> Logout </v-btn>
          </template>
        </v-app-bar>
      </template>

      <template #navigation-drawer v-if="isLoggedIn">
        <v-navigation-drawer v-model="drawer">
          <v-list>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              :subtitle="authStore.user?.email" :title="authStore.user?.name"></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      </template>

      <template #container>
        <RouterView />
      </template>

      <template #snackbar>
        <v-snackbar v-model="snackbarVisible" :color="snackbarColor" timeout="3000">
          {{ snackbarMessage }}
        </v-snackbar>
      </template>
    </MainLayout>
  </v-app>
</template>