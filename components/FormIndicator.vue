<script setup lang="ts">
defineProps<{
  result: 'W' | 'L' | 'D';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}>();
</script>

<template>
  <span
    class="flex items-center justify-center text-white text-xs font-bold rounded-full"
    :class="{
      'bg-green-500': result === 'W',
      'bg-red-500': result === 'L',
      'bg-yellow-500': result === 'D',
      'w-5 h-5': size === 'sm',
      'w-6 h-6': size === 'md' || !size,
      'w-8 h-8 text-sm': size === 'lg',
      'w-10 h-10 text-sm': size === 'xl'
    }"
  >
    {{ result }}
  </span>
</template>
