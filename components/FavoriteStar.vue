<script setup lang="ts">
import StarIcon from './icons/StarIcon.vue';

withDefaults(defineProps<{
  isFavorite?: boolean
}>(), {
  isFavorite: false
});

const emit = defineEmits(['toggle']);
</script>

<template>
  <button
    @click.stop="emit('toggle')"
    class="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    :class="{
      'bg-yellow-500 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': isFavorite,
      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600': !isFavorite,
    }"
    title="Set as favorite team"
  >
    <StarIcon />
  </button>
</template>
