<script setup lang="ts">
import { SortField, SortDirection } from '../../types/enums';

defineProps({
  label: {
    type: String,
    required: true
  },
  field: {
    type: String as () => SortField,
    required: true
  },
  currentSortBy: {
    type: String as () => SortField,
    required: true
  },
  currentDirection: {
    type: String as () => SortDirection,
    required: true
  }
});

const emit = defineEmits(['sort']);
</script>

<template>
  <th
    scope="col"
    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
    @click="emit('sort', field)"
  >
    <div class="flex items-center space-x-1">
      <span>{{ label }}</span>
      <svg
        v-if="currentSortBy === field"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          v-if="currentDirection === SortDirection.Asc"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 15l7-7 7 7"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </th>
</template>
