<script setup lang="ts">
  defineProps<{
    label: string;
    value: string | number;
  }>();
</script>

<template>
  <div class="flex items-center space-x-2">
    <slot name="icon"></slot>
    <p class="dark:text-gray-300">
      <strong>{{ label }}:</strong> {{ value }}
      <slot name="action"></slot>
    </p>
  </div>
</template>
