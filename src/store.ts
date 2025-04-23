import { defineStore } from 'pinia';

/**
 * Interface for the state of the global store.
 */
interface GlobalStoreState {
    snackbarColor: string;
    snackbarVisible: boolean;
    snackbarMessage: string;
}

/**
 * A Pinia store for managing global state related to a snackbar (toast) component.
 *
 * @store useGlobalStore
 * @description This store provides state and actions to control the visibility, message,
 * and color of a snackbar component.
 */
export const useGlobalStore = defineStore('global-store', {
    /**
     * State of the global store.
     */
    state: (): GlobalStoreState => ({
        snackbarColor: '#0000FF',
        snackbarVisible: false,
        snackbarMessage: '',
    }),
    actions: {
        /**
         * Displays the snackbar with a given message.
         *
         * @param {string} msg - The message to display in the snackbar.
         */
        showToast(msg: string): void {
            this.snackbarMessage = msg;
            this.snackbarVisible = true;
        },
        /**
         * Hides the snackbar and clears its message.
         */
        hideToast(): void {
            this.snackbarVisible = false;
            this.snackbarMessage = '';
        },
    },
});
