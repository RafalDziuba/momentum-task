<script setup lang="ts">
  withDefaults(
    defineProps<{
      direction?: 'left' | 'right' | 'up' | 'down';
    }>(),
    {
      direction: 'left',
    }
  );
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    :style="{
      transform:
        direction === 'right'
          ? 'rotate(180deg)'
          : direction === 'up'
          ? 'rotate(90deg)'
          : direction === 'down'
          ? 'rotate(-90deg)'
          : '',
    }"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
</template>
