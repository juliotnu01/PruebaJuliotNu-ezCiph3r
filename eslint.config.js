import pluginVue from 'eslint-plugin-vue';
import tsParser from '@typescript-eslint/parser';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import vueEslintParser from 'vue-eslint-parser'; // Importa el parser directamente

// Configuración recomendada de Vue
const vueRecommended = pluginVue.configs
  ? pluginVue.configs['vue3-recommended']
  : {};

// Configuración recomendada de TypeScript
const tsRecommended = tsEslintPlugin.configs?.recommended;

export default [
  {
    files: ['**/*.ts', '**/*.vue'], // Archivos que se analizarán
    languageOptions: {
      parser: vueEslintParser, // Usa el parser importado
      parserOptions: {
        parser: '@typescript-eslint/parser', // Usa @typescript-eslint/parser para TypeScript
        ecmaVersion: 2020,
        sourceType: 'module',
        extraFileExtensions: ['.vue'], // Asegura que ESLint reconozca archivos .vue
      },
    },
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': tsEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Reglas de Vue
      ...vueRecommended?.rules, // Usamos optional chaining para evitar errores si vueRecommended es undefined
      'vue/multi-word-component-names': 'off',

      // Reglas de TypeScript
      ...tsRecommended?.rules, // Usamos optional chaining para evitar errores si tsRecommended es undefined
      'no-unused-vars': 'warn',

      // Reglas de Prettier
      'prettier/prettier': 'error',
    },
  },
];
