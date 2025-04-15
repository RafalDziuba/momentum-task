<script setup lang="ts">
  defineProps({
    teamName: {
      type: String,
      default: 'Team Name',
    },

    role: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <div class="text-center">
    <p class="dark:text-white font-semibold">
      {{ teamName }}
    </p>
    <p class="text-sm text-gray-500 dark:text-gray-400">({{ role }})</p>
  </div>
</template>
