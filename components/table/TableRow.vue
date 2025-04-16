<script setup lang="ts">
withDefaults(defineProps<{
  hover?: boolean;
}>(), {
  hover: true
});
</script>

<template>
  <tr :class="{ 'hover:bg-gray-50 dark:hover:bg-gray-700': hover }">
    <slot></slot>
  </tr>
</template>
