<script setup lang="ts">
import { useTeamsStore } from '~/stores/teamsModule';
import type { Team } from '~/types';

defineProps<{
  team: Team;
}>();

const teamsStore = useTeamsStore();
</script>

<template>
  <div class="flex justify-between items-center mb-6">
    <NuxtLink
      to="/"
      class="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-1"
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
      Back to Teams
    </NuxtLink>

    <!-- Favorite Button -->
    <button
      @click="teamsStore.toggleFavoriteTeam(team)"
      class="flex items-center px-3 py-2 rounded-md transition-colors"
      :class="{
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
          teamsStore.favoriteTeamId === team.id,
        'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600':
          teamsStore.favoriteTeamId !== team.id,
      }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-1"
        fill="currentColor"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="0"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
      {{ teamsStore.favoriteTeamId === team.id ? 'Favorite Team' : 'Set as Favorite' }}
    </button>
  </div>
</template>
