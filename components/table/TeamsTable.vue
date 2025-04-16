<script setup lang="ts">
import type { Team } from '../../types';
import { SortField, SortDirection } from '../../types/enums';
import type { PropType } from 'vue';
import SortableTableHeader from './SortableTableHeader.vue';
import TeamTableRow from './TeamTableRow.vue';
import { useTeamsStore } from '../../stores/teamsModule';

defineProps<{
  teams: Team[];
  sortBy: SortField;
  sortDirection: SortDirection;
}>();

const emit = defineEmits(['sort', 'rowClick', 'toggleFavorite']);

const teamsStore = useTeamsStore();

const tableHeaders = [
  { label: 'Pos', field: SortField.Position },
  { label: 'Team', field: SortField.Name },
  { label: 'Points', field: SortField.Points },
  { label: 'Played', field: null },
  { label: 'W', field: SortField.Wins },
  { label: 'D', field: SortField.Draws },
  { label: 'L', field: SortField.Losses },
  { label: 'GF', field: SortField.GoalsFor },
  { label: 'GA', field: SortField.GoalsAgainst },
  { label: 'Form', field: null }
];
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <template v-for="header in tableHeaders" :key="header.label">
            <SortableTableHeader
              v-if="header.field !== null"
              :label="header.label"
              :field="header.field"
              :current-sort-by="sortBy"
              :current-direction="sortDirection"
              @sort="emit('sort', $event)"
            />
            <th
              v-else
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              <div class="flex items-center space-x-1">
                <span>{{ header.label }}</span>
              </div>
            </th>
          </template>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        <TeamTableRow
          v-for="team in teams"
          :key="team.id"
          :team="team"
          :is-favorite="teamsStore.favoriteTeamId === team.id"
          @click="emit('rowClick', $event)"
          @toggle-favorite="emit('toggleFavorite', $event)"
        />
      </tbody>
    </table>
  </div>
</template>
