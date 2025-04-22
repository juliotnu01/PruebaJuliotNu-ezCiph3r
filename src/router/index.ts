import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// Define your routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login.view',
    component: () => import('@/views/LoginView.vue'),
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
