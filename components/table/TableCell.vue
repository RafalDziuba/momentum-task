<script setup lang="ts">
defineProps({
  value: {
    required: true
  }
});
</script>

<template>
  <td class="px-6 py-4 whitespace-nowrap">
    <div class="text-sm font-medium text-gray-900 dark:text-white">
      {{ value }}
    </div>
  </td>
</template>
