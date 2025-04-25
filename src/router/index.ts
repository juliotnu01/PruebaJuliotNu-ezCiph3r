import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login.view',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
    beforeEnter: (to, from, next) => {
      const isAuthenticated =
        localStorage.getItem('isAuthenticated') === 'true';

      if (isAuthenticated) {
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
