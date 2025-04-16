<script setup lang="ts">
withDefaults(defineProps<{
  primary?: boolean;
  secondary?: boolean;
}>(), {
  primary: true,
  secondary: false
});
</script>

<template>
  <button
    class="px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none"
    :class="{
      'border-transparent text-white bg-blue-600 hover:bg-blue-700': primary,
      'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600': secondary
    }"
  >
    <slot></slot>
  </button>
</template>