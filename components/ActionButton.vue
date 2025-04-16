<script setup lang="ts">
defineProps<{
  label: string;
  size?: 'sm' | 'md' | 'lg';
}>();

defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <button
    @click="$emit('click')"
    :class="[
      'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium',
      { 'text-sm': size === 'sm' }
    ]"
  >
    {{ label }}
  </button>
</template>
