<script setup lang="ts">
defineProps<{
  recentForm: ('W' | 'D' | 'L')[];
}>();
</script>

<template>
  <div class="mb-6">
    <h4 class="text-lg font-medium mb-2 dark:text-white">Recent Form</h4>
    <div class="flex space-x-3">
      <span
        v-for="(result, index) in recentForm"
        :key="index"
        class="w-10 h-10 flex items-center justify-center text-white text-sm font-bold rounded-full"
        :class="{
          'bg-green-500': result === 'W',
          'bg-red-500': result === 'L',
          'bg-yellow-500': result === 'D',
        }"
      >
        {{ result }}
      </span>
    </div>
    <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
      Most recent match on the right
    </p>
  </div>
</template>
