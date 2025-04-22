<script setup lang="ts">
import { shallowRef } from 'vue';
import LoginLayout from '@/layouts/LoginLayout.vue';
import { useAuthStore } from '@/modules/auth';
import { storeToRefs } from 'pinia';

// auth
const AuthStore = useAuthStore();
const { user, loading, loadingRegister, userRegister } = storeToRefs(AuthStore);
const { loginUser, registerUser } = AuthStore;

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
                    <v-text-field type="email" label="User email" v-model="user.email"></v-text-field>
                    <v-text-field type="password" label="Password" v-model="user.password"></v-text-field>
                    <v-btn :loading="loading" class="mt-2" type="submit" block>Login</v-btn>
                  </v-form>
                </v-window-item>

                <v-window-item class="pa-2" value="0">
                  <v-card>
                    <v-form @submit.prevent="registerUser">
                      <v-text-field type="email" label="User email" v-model="userRegister.email"></v-text-field>
                      <v-text-field type="text" label="User name" v-model="userRegister.name"></v-text-field>
                      <v-text-field type="password" label="Password" v-model="userRegister.password"></v-text-field>
                      <v-text-field type="password" label="Confirm password"
                        v-model="userRegister.c_password"></v-text-field>
                      <v-btn :loading="loadingRegister" class="mt-2" type="submit" block>Register</v-btn>
                    </v-form>
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
