<script setup lang="ts">
  interface Props {
    isOpen: boolean;
    title: string;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<{
    (e: 'close'): void;
  }>();

  function closeModal() {
    emit('close');
  }

  function handleDialogClick(event: Event) {
    event.stopPropagation();
  }
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="closeModal"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full"
      @click="handleDialogClick"
    >
      <h3 class="text-xl font-bold mb-4 dark:text-white">{{ title }}</h3>

      <div class="mb-6">
        <slot />
      </div>

      <div class="flex justify-end space-x-3">
        <slot name="footer">
          <button
            @click="closeModal"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
          >
            Cancel
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>
