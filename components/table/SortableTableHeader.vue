<script setup lang="ts">
import { SortField, SortDirection } from '../../types/enums';
import SortIcon from '../icons/SortIcon.vue';

defineProps<{
  label: string;
  field: SortField;
  currentSortBy: SortField;
  currentDirection: SortDirection;
}>();

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
      <SortIcon
        v-if="currentSortBy === field"
        :direction="currentDirection"
      />
    </div>
  </th>
</template>
