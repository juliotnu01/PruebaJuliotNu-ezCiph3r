# Proyecto: Juliot Nuñez Ciph3r

Este proyecto es una aplicación web desarrollada con **Vue 3**, **TypeScript** y **Vite**. La aplicación utiliza **Vuetify** como framework de diseño de componentes y **Pinia** como gestor de estado global. Su propósito principal es gestionar productos y usuarios, con funcionalidades como autenticación, visualización de productos y navegación entre vistas.

## Tabla de Contenidos

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Dependencias](#dependencias)
- [Descripción de Componentes y Módulos](#descripción-de-componentes-y-módulos)
- [Variables de Entorno](#variables-de-entorno)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## Características

- **Autenticación**: Inicio de sesión y registro de usuarios.
- **Gestión de Productos**: Visualización de productos con detalles, paginación e interacción.
- **Diseño Responsivo**: Uso de Vuetify para un diseño moderno y adaptable.
- **Gestión de Estado**: Implementación de Pinia para el manejo del estado global.
- **Rutas Protegidas**: Navegación basada en permisos de autenticación.
- **Interacción con API**: Uso de Axios para consumir servicios REST.

---

## Estructura del Proyecto

```plaintext
├── public/                # Archivos públicos
├── src/                   # Código fuente principal
│   ├── api/               # Configuración de Axios y llamadas a la API
│   ├── assets/            # Recursos estáticos
│   ├── components/        # Componentes reutilizables
│   ├── composables/       # Funciones reutilizables (hooks)
│   ├── layouts/           # Diseños base para las vistas
│   ├── modules/           # Módulos específicos (auth, products)
│   ├── router/            # Configuración de rutas
│   ├── [store.ts](http://_vscodecontentref_/0)           # Configuración global de Pinia
│   ├── [style.css](http://_vscodecontentref_/1)          # Estilos globales
│   ├── views/             # Vistas principales
│   ├── [App.vue](http://_vscodecontentref_/2)            # Componente raíz
│   ├── [main.ts](http://_vscodecontentref_/3)            # Punto de entrada de la aplicación
├── .env                   # Variables de entorno
├── [package.json](http://_vscodecontentref_/4)           # Dependencias y scripts
├── [tsconfig.json](http://_vscodecontentref_/5)          # Configuración de TypeScript
├── [vite.config.ts](http://_vscodecontentref_/6)         # Configuración de Vite