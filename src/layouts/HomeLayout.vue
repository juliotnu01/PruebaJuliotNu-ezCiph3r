<template>
    <v-layout>
        <v-container>
            <template v-if="skeleton">
                <slot name="skeleton"></slot>
            </template>
            <template v-else>
                <slot name="items" :items="items"></slot>
            </template>
            <v-infinite-scroll v-if="!skeleton && items.length < allItemsLength" :loading="loadingMore"
                @load="handleLoadMore">
                <template v-slot:loading>
                    <v-row justify="center" class="mt-4">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
                </template>
            </v-infinite-scroll>
        </v-container>
    </v-layout>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    skeleton: boolean;
    items: Array<any>;
    allItemsLength: number;
    loadingMore: boolean;
}>();


const emit = defineEmits<{
    (event: 'load-more-items'): void;
}>();


const handleLoadMore = () => {
    emit('load-more-items');
};
</script>

<style scoped>
.v-infinite-scroll {
    overflow: hidden !important;
    padding-bottom: 20px;
}
</style>