<script setup lang="ts">
import { shallowRef } from 'vue';
import LoginLayout from '@/layouts/LoginLayout.vue';
import { useAuthStore } from '@/modules/auth';
import { storeToRefs } from 'pinia';

// auth
const AuthStore = useAuthStore();
const { user, loading } = storeToRefs(AuthStore);
const { loginUser } = AuthStore;

const tabs = shallowRef(0);
</script>

<template>
  <LoginLayout>
    <template #container>
      <v-card class="mx-auto" max-width="360" variant="flat" border>
        <v-layout>
          <v-app-bar>
            <template #prepend>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>

            <template #extension>
              <v-tabs v-model="tabs" color="#4c00d5" grow>
                <v-tab text="Login"></v-tab>
                <v-tab text="Register"></v-tab>
              </v-tabs>
            </template>
          </v-app-bar>

          <v-main>
            <div class="pt-4 pb-16">
              <v-window v-model="tabs">
                <v-window-item class="pa-2" value="0">
                  <v-form @submit.prevent="loginUser">
                    <v-text-field
                      type="email"
                      label="User email"
                      v-model="user.email"
                    ></v-text-field>
                    <v-text-field
                      type="password"
                      label="Password"
                      v-model="user.password"
                    ></v-text-field>
                    <v-btn :loading="loading" class="mt-2" type="submit" block
                      >Login</v-btn
                    >
                  </v-form>
                </v-window-item>

                <v-window-item class="pa-2" value="0">
                  <v-card>
                    <v-empty-state
                      class="pa-0"
                      image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-dog.svg"
                      size="200"
                    >
                      <template v-slot:media>
                        <v-sheet class="py-4 mb-4" color="#fdefff">
                          <v-img></v-img>
                        </v-sheet>
                      </template>

                      <template v-slot:title>
                        <div class="text-h6 text-high-emphasis">
                          Get Started
                        </div>
                      </template>

                      <template v-slot:text>
                        <div
                          class="text-body-2 font-weight-medium text-medium-emphasis"
                        >
                          Watch your favorite TV Shows with the Movies & TV app.
                        </div>
                      </template>

                      <template v-slot:actions>
                        <v-spacer></v-spacer>

                        <v-btn color="#4c00d5" text="Shop TV Shows"></v-btn>

                        <v-spacer></v-spacer>
                      </template>
                    </v-empty-state>
                  </v-card>
                </v-window-item>
              </v-window>
            </div>
          </v-main>
        </v-layout>
      </v-card>
    </template>
  </LoginLayout>
</template>
