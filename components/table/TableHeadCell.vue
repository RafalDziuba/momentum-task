<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <th
    scope="col"
    class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
  >
    {{ label }}
  </th>
</template>
