<script setup lang="ts">
  import FormIndicator from '~/components/FormIndicator.vue';

  defineProps<{
    recentForm: ('W' | 'D' | 'L')[];
  }>();
</script>

<template>
  <div class="mb-6">
    <h4 class="text-lg font-medium mb-2 dark:text-white">Recent Form</h4>
    <div class="flex space-x-3">
      <FormIndicator
        v-for="(result, index) in recentForm"
        :key="index"
        :result="result"
        size="xl"
      />
    </div>
    <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">Most recent match on the right</p>
  </div>
</template>
