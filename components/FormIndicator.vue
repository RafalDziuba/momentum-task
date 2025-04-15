<script setup lang="ts">
defineProps({
  result: {
    type: String,
    required: true,
    validator: (value: string) => ['W', 'L', 'D'].includes(value)
  }
});
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
