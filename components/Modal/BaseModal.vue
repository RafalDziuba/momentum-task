<script setup lang="ts">
  defineProps({
    title: String,
    confirmText: {
      type: String,
      default: 'Confirm',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    showConfirm: {
      type: Boolean,
      default: true,
    },
  });

  defineEmits(['close', 'confirm']);
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
      <h3 class="text-xl font-bold mb-4 dark:text-white">{{ title }}</h3>

      <div class="mb-6">
        <slot />
      </div>

      <div class="flex justify-end space-x-3">
        <slot name="footer-prepend"></slot>

        <UiButton v-if="showCancel" @click="$emit('close')" secondary>
          {{ cancelText }}
        </UiButton>

        <UiButton v-if="showConfirm" @click="$emit('confirm')" primary>
          {{ confirmText }}
        </UiButton>

        <slot name="footer-append"></slot>
      </div>
    </div>
  </div>
</template>
