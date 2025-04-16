<script setup lang="ts">
import { useTeamsStore } from '~/stores/teamsModule';
import type { Team } from '~/types';

const props = defineProps<{
  team: Team;
}>();

const teamsStore = useTeamsStore();

const statsItems = [
  { label: 'Played', value: () => teamsStore.gamesPlayed(props.team), color: 'dark:text-white' },
  { label: 'Won', value: () => props.team.wins, color: 'text-green-600 dark:text-green-400' },
  { label: 'Drawn', value: () => props.team.draws, color: 'text-yellow-600 dark:text-yellow-400' },
  { label: 'Lost', value: () => props.team.losses, color: 'text-red-600 dark:text-red-400' },
];
</script>

<template>
  <div class="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
    <h4 class="text-lg font-medium mb-3 dark:text-white">Season Summary</h4>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="(item, index) in statsItems" :key="index" class="text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.label }}</p>
        <p :class="['text-2xl font-bold', item.color]">
          {{ item.value() }}
        </p>
      </div>
    </div>
  </div>
</template>
