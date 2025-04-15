<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import type { Team } from '../types';
  import { SortField, SortDirection } from '../types/enums';
  import { useTeamsStore } from '../stores/teamsModule';
  import TeamsTable from '../components/table/TeamsTable.vue';

  const teamsStore = useTeamsStore();
  const router = useRouter();

  const sortBy = ref<SortField>(SortField.Position);
  const sortDirection = ref<SortDirection>(SortDirection.Asc);

  // Computed property to get selected team from store
  const selectedTeam = computed(() => teamsStore.selectedTeam);

  onMounted(() => {
    // Reset selected team when entering the main page
    teamsStore.clearSelectedTeam();
    
    teamsStore.fetchTeams();

    // Load favorite team from local storage
    const savedFavoriteTeamId = localStorage.getItem('favoriteTeamId');
    if (savedFavoriteTeamId) {
      teamsStore.favoriteTeamId = parseInt(savedFavoriteTeamId);
    }
  });

  // Function to handle team selection and navigation
  function navigateToTeamDetails(teamId: number) {
    teamsStore.selectTeam(teamId);
    router.push(`/team/${teamId}`);
  }

  function toggleSortDirection(field: SortField) {
    if (sortBy.value === field) {
      // Toggle direction if clicking the same field
      sortDirection.value =
        sortDirection.value === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;
    } else {
      // Set new field and reset direction to ascending
      sortBy.value = field;
      sortDirection.value = SortDirection.Asc;
    }
  }

  const filteredAndSortedTeams = computed<Team[]>(() => {
    // First filter the teams
    let filtered = teamsStore.teams;

    // Then sort the filtered results
    return [...filtered].sort((a, b) => {
      let comparison = 0;

      if (sortBy.value === SortField.Name) {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy.value === SortField.Points) {
        comparison = a.points - b.points;
      } else if (sortBy.value === SortField.Wins) {
        comparison = a.wins - b.wins;
      } else if (sortBy.value === SortField.Draws) {
        comparison = a.draws - b.draws;
      } else if (sortBy.value === SortField.Losses) {
        comparison = a.losses - b.losses;
      } else if (sortBy.value === SortField.GoalsFor) {
        comparison = a.goalsFor - b.goalsFor;
      } else if (sortBy.value === SortField.GoalsAgainst) {
        comparison = a.goalsAgainst - b.goalsAgainst;
      } else {
        // Default sort by position
        comparison = a.position - b.position;
      }

      // Reverse for descending order
      return sortDirection.value === SortDirection.Asc ? comparison : -comparison;
    });
  });
</script>

<template>
  <UiSpinner v-if="teamsStore.isLoading" />
  
  <TeamsTable 
    v-if="!selectedTeam && !teamsStore.isLoading"
    :teams="filteredAndSortedTeams"
    :sort-by="sortBy"
    :sort-direction="sortDirection"
    @sort="toggleSortDirection"
    @row-click="navigateToTeamDetails"
    @toggle-favorite="teamsStore.toggleFavoriteTeam"
  />
</template>
