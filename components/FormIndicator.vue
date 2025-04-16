<script setup lang="ts">
defineProps<{
  result: 'W' | 'L' | 'D';
}>();
</script>

<template>
  <span
    class="w-6 h-6 flex items-center justify-center text-white text-xs font-bold rounded-full"
    :class="{
      'bg-green-500': result === 'W',
      'bg-red-500': result === 'L',
      'bg-yellow-500': result === 'D',
    }"
  >
    {{ result }}
  </span>
</template>
