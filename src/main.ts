import { createApp } from 'vue';
import './style.css'; // Asegúrate de tener este archivo
import App from './App.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { createPinia } from 'pinia';
import router from './router';

// Crear instancias de Vuetify, Pinia y el enrutador
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
const pinia = createPinia();

// Crear la aplicación
createApp(App)
  .use(router)
  .use(vuetify) // Usa Vuetify
  .use(pinia)
  .mount('#app');
