<script setup lang="ts">
  import { ref } from 'vue';
  import { useTeamsStore } from '~/stores/teamsModule';
  import type { Team } from '~/types';
  import ArrowIcon from '../icons/ArrowIcon.vue';
  import StarIcon from '../icons/StarIcon.vue';
  import AddMatchModal from '../Team/AddMatchModal.vue';

  defineProps<{
    team: Team;
  }>();

  const teamsStore = useTeamsStore();
  const showAddMatchModal = ref(false);

  const openAddMatchModal = () => {
    showAddMatchModal.value = true;
  };

  const closeAddMatchModal = () => {
    showAddMatchModal.value = false;
  };
</script>

<template>
  <div class="flex justify-between items-center mb-6">
    <NuxtLink
      to="/"
      class="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
    >
      <ArrowIcon />
      Back to Teams
    </NuxtLink>

    <div class="flex gap-4">
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
        <StarIcon />

        {{ teamsStore.favoriteTeamId === team.id ? 'Favorite Team' : 'Set as Favorite' }}
      </button>

      <button
        @click="openAddMatchModal"
        class="flex items-center px-3 py-2 rounded-md transition-colors bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        Add match
      </button>
    </div>

    <AddMatchModal v-if="showAddMatchModal" :team="team" @close="closeAddMatchModal" />
  </div>
</template>
