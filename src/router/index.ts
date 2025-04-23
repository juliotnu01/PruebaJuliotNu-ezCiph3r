import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/modules/auth/store';
import { storeToRefs } from 'pinia';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login.view',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      const { isLoggedIn } = storeToRefs(authStore);

      if (isLoggedIn.value) {
        next({ name: 'home.view' });
      } else {
        next();
      }
    },
  },
  {
    path: '/home',
    name: 'home.view',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
