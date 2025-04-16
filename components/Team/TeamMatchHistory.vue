<script setup lang="ts">
  import { useTeamsStore } from '~/stores/teamsModule';
  import TeamRecentForm from './TeamRecentForm.vue';
  import TeamSeasonSummary from './TeamSeasonSummary.vue';
  import TeamMatchesTable from './TeamMatchesTable.vue';
  import type { Team } from '~/types';
  import TickIcon from '../icons/TickIcon.vue';

  defineProps<{
    team: Team;
  }>();

  const teamsStore = useTeamsStore();
</script>

<template>
  <div class="p-6 border-t border-gray-200 dark:border-gray-700">
    <h3 class="text-xl font-semibold mb-4 dark:text-white">All Matches</h3>

    <!-- Success Message -->
    <div
      v-if="teamsStore.showEditSuccess"
      class="mb-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md flex items-center"
    >
      <TickIcon />
      Match result updated successfully! Standings have been recalculated.
    </div>

    <!-- Loading State -->
    <UiSpinner v-if="teamsStore.isLoadingMatches" />

    <!-- No Matches -->
    <div
      v-else-if="teamsStore.teamMatches.length === 0"
      class="text-center py-8 text-gray-500 dark:text-gray-400"
    >
      No match history available
    </div>

    <!-- Matches List -->
    <div v-else>
      <!-- Recent Form Display -->
      <TeamRecentForm :recent-form="team.recentForm" />

      <!-- Match Statistics Summary -->
      <TeamSeasonSummary :team="team" />

      <!-- All Matches Table - Fix to pass matches from teamsStore -->
      <TeamMatchesTable :matches="teamsStore.teamMatches" />
    </div>
  </div>
</template>
