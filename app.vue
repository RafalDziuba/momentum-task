<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import type { Team, Match, FormattedMatch } from './types';
  import { SortField, SortDirection } from './types/enums';
  import BaseModal from './components/Modal/BaseModal.vue';
  import TeamInfoBox from './components/Modal/TeamInfoBox.vue';
  import { useTeamsStore } from './stores/teamsModule';

  const teamsStore = useTeamsStore();

  const sortBy = ref<SortField>(SortField.Position);
  const sortDirection = ref<SortDirection>(SortDirection.Asc);

  // Computed property to get selected team from store
  const selectedTeam = computed(() => teamsStore.selectedTeam);

  onMounted(() => {
    teamsStore.fetchTeams();

    // Load favorite team from local storage
    const savedFavoriteTeamId = localStorage.getItem('favoriteTeamId');
    if (savedFavoriteTeamId) {
        teamsStore.favoriteTeamId = parseInt(savedFavoriteTeamId);
    }
  });

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
  <NuxtLayout>
      <UiSpinner v-if="teamsStore.isLoading" />
      <!-- Teams Table View (moved above favorite team section) -->
      <div
        v-if="!selectedTeam && !teamsStore.isLoading"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8"
      >
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                @click="toggleSortDirection(SortField.Position)"
              >
                <div class="flex items-center space-x-1">
                  <span>Pos</span>
                  <svg
                    v-if="sortBy === SortField.Position"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      v-if="sortDirection === SortDirection.Asc"
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
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                @click="toggleSortDirection(SortField.Name)"
              >
                <div class="flex items-center space-x-1">
                  <span>Team</span>
                  <svg
                    v-if="sortBy === SortField.Name"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      v-if="sortDirection === SortDirection.Asc"
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
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                @click="toggleSortDirection(SortField.Points)"
              >
                <div class="flex items-center space-x-1">
                  <span>Points</span>
                  <svg
                    v-if="sortBy === SortField.Points"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      v-if="sortDirection === SortDirection.Asc"
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
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                <div class="flex items-center space-x-1">
                  <span>Played</span>
                </div>
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                @click="toggleSortDirection(SortField.Wins)"
              >
                <div class="flex items-center space-x-1">
                  <span>W</span>
                  <svg
                    v-if="sortBy === SortField.Wins"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      v-if="sortDirection === SortDirection.Asc"
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
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                @click="toggleSortDirection(SortField.Draws)"
              >
                <div class="flex items-center space-x-1">
                  <span>D</span>
                  <svg
                    v-if="sortBy === SortField.Draws"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      v-if="sortDirection === SortDirection.Asc"
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
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                @click="toggleSortDirection(SortField.Losses)"
              >
                <div class="flex items-center space-x-1">
                  <span>L</span>
                  <svg
                    v-if="sortBy === SortField.Losses"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      v-if="sortDirection === SortDirection.Asc"
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
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                @click="toggleSortDirection(SortField.GoalsFor)"
              >
                <div class="flex items-center space-x-1">
                  <span>GF</span>
                  <svg
                    v-if="sortBy === SortField.GoalsFor"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      v-if="sortDirection === SortDirection.Asc"
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
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                @click="toggleSortDirection(SortField.GoalsAgainst)"
              >
                <div class="flex items-center space-x-1">
                  <span>GA</span>
                  <svg
                    v-if="sortBy === SortField.GoalsAgainst"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      v-if="sortDirection === SortDirection.Asc"
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
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Form
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr
              v-for="team in filteredAndSortedTeams"
              :key="team.id"
              @click="teamsStore.selectTeam(team.id)"
              class="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              :class="{
                'bg-blue-50 dark:bg-blue-900/20': teamsStore.favoriteTeamId === team.id,
              }"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ team.position }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ team.name }}
                  </div>
                  <!-- Favorite Star -->
                  <button
                    @click.stop="teamsStore.toggleFavoriteTeam(team)"
                    class="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    :class="{
                      'bg-yellow-500 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
                        teamsStore.favoriteTeamId === team.id,
                      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600':
                        teamsStore.favoriteTeamId !== team.id,
                    }"
                    title="Set as favorite team"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
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
                  </button>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ team.points }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ teamsStore.gamesPlayed(team) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ team.wins }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ team.draws }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ team.losses }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ team.goalsFor }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ team.goalsAgainst }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-1">
                  <span
                    v-for="(result, index) in team.recentForm"
                    :key="index"
                    class="w-6 h-6 flex items-center justify-center text-white text-xs font-bold rounded-full"
                    :class="{
                      'bg-green-500': result === 'W',
                      'bg-red-500': result === 'L',
                      'bg-yellow-500': result === 'D',
                    }"
                  >
                    {{ result }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Favorite Team Section (only shown when a favorite team is selected) -->
      <div v-if="teamsStore.favoriteTeam && !selectedTeam && !teamsStore.isLoading" class="mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div
            class="p-4 bg-blue-50 dark:bg-blue-900 border-b border-blue-100 dark:border-blue-800"
          >
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-semibold text-blue-800 dark:text-blue-200">
                <span class="mr-2">⭐</span> {{ teamsStore.favoriteTeam.name }} - Recent Form
              </h2>
              <button
                @click="teamsStore.selectTeam(teamsStore.favoriteTeam.id)"
                class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                View Full Details
              </button>
            </div>
          </div>

          <div class="p-6">
            <div
              v-if="teamsStore.favoriteTeamRecentMatches.length === 0"
              class="text-center py-4 text-gray-500 dark:text-gray-400"
            >
              No recent matches available
            </div>
            <div v-else>
              <!-- Recent Form Display -->
              <div class="mt-2">
                <div class="flex space-x-3">
                  <span
                    v-for="(match, index) in teamsStore.favoriteTeamRecentMatches"
                    :key="index"
                    class="w-10 h-10 flex items-center justify-center text-white text-sm font-bold rounded-full"
                    :class="{
                      'bg-green-500': match.result === 'W',
                      'bg-red-500': match.result === 'L',
                      'bg-yellow-500': match.result === 'D',
                    }"
                  >
                    {{ match.result }}
                  </span>
                </div>
                <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Most recent match on the right
                </p>
              </div>

              <!-- Recent Matches Table -->
              <div class="mt-6 overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Match
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    <tr
                      v-for="match in teamsStore.favoriteTeamRecentMatches"
                      :key="match.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td
                        class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                      >
                        {{ match.date }}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <span
                            :class="{ 'font-bold': match.isHome }"
                            class="text-gray-900 dark:text-white"
                          >
                            {{ match.homeTeam }}
                          </span>
                          <span class="mx-2 text-gray-500 dark:text-gray-400">vs</span>
                          <span
                            :class="{ 'font-bold': !match.isHome }"
                            class="text-gray-900 dark:text-white"
                          >
                            {{ match.awayTeam }}
                          </span>
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center space-x-2">
                          <span class="text-gray-900 dark:text-white font-medium">
                            {{ match.homeScore }} - {{ match.awayScore }}
                          </span>
                          <span
                            class="w-6 h-6 flex items-center justify-center text-white text-xs font-bold rounded-full"
                            :class="{
                              'bg-green-500': match.result === 'W',
                              'bg-red-500': match.result === 'L',
                              'bg-yellow-500': match.result === 'D',
                            }"
                          >
                            {{ match.result }}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Details -->
      <div v-else-if="selectedTeam" class="team-details py-6">
        <div class="flex justify-between items-center mb-6">
          <button
            @click="teamsStore.selectedTeamId = null"
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
          </button>

          <!-- Favorite Button in Team Details -->
          <button
            @click="teamsStore.toggleFavoriteTeam(selectedTeam)"
            class="flex items-center px-3 py-2 rounded-md transition-colors"
            :class="{
              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
                teamsStore.favoriteTeamId === selectedTeam.id,
              'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600':
                teamsStore.favoriteTeamId !== selectedTeam.id,
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
            {{ teamsStore.favoriteTeamId === selectedTeam.id ? 'Favorite Team' : 'Set as Favorite' }}
          </button>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
            <h2 class="text-3xl font-bold">{{ selectedTeam.name }}</h2>
            <p class="text-blue-100">
              Position: #{{ selectedTeam.position }} • Points:
              {{ selectedTeam.points }}
            </p>
          </div>

          <div class="p-6">
            <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
              <div>
                <div class="flex items-center mb-4">
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                    {{ selectedTeam.name }}
                  </h2>
                  <span
                    class="ml-3 px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    #{{ selectedTeam.position }}
                  </span>
                </div>

                <div class="space-y-3">
                  <div class="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p class="dark:text-gray-300">
                      <strong>Founded:</strong> {{ selectedTeam.founded }}
                    </p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <p class="dark:text-gray-300">
                      <strong>Stadium:</strong> {{ selectedTeam.stadium }}
                      <button
                        @click="teamsStore.startEditingTeamDetails()"
                        class="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                      >
                        Edit
                      </button>
                    </p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <p class="dark:text-gray-300">
                      <strong>Coach:</strong> {{ selectedTeam.coach }}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-xl font-semibold mb-4 dark:text-white">Team Stats</h3>
                <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
                      Points
                    </h4>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">
                      {{ selectedTeam.points }}
                    </p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
                      Goals Scored
                    </h4>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">
                      {{ selectedTeam.goalsFor }}
                    </p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
                      Goals Conceded
                    </h4>
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">
                      {{ selectedTeam.goalsAgainst }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Match History Section -->
          <div class="p-6 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-semibold mb-4 dark:text-white">All Matches</h3>

            <!-- Success Message -->
            <div
              v-if="teamsStore.showEditSuccess"
              class="mb-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Match result updated successfully! Standings have been recalculated.
            </div>

            <!-- Loading State -->
            <UiSpinner v-if="teamsStore.isLoadingMatches" />

            <!-- Match Editing Modal -->
            <BaseModal
              v-if="teamsStore.isEditingResult"
              title="Edit Match Result"
              confirm-text="Save Result"
              cancel-text="Cancel"
              @confirm="teamsStore.saveMatchResult()"
              @close="teamsStore.cancelEditMatch()"
            >
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <TeamInfoBox :team-name="teamsStore.editingMatch?.homeTeam" :role="'Home'" />

                  <div class="text-center">
                    <p class="font-semibold dark:text-white">vs</p>
                  </div>

                  <TeamInfoBox :team-name="teamsStore.editingMatch?.awayTeam" :role="'Away'" />
                </div>

                <div class="flex items-center justify-center space-x-4">
                  <UiInputField
                    label="Home Score"
                    v-model="teamsStore.editHomeScore"
                    type="number"
                    min="0"
                    max="7"
                    class="w-16"
                  />

                  <div class="text-xl font-bold dark:text-white mt-6">-</div>

                  <UiInputField
                    label="Away Score"
                    v-model="teamsStore.editAwayScore"
                    type="number"
                    min="0"
                    max="7"
                    class="w-16"
                  />
                </div>
              </div>
            </BaseModal>

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
              <div class="mb-6">
                <h4 class="text-lg font-medium mb-2 dark:text-white">Recent Form</h4>
                <div class="flex space-x-3">
                  <span
                    v-for="(result, index) in selectedTeam.recentForm"
                    :key="index"
                    class="w-10 h-10 flex items-center justify-center text-white text-sm font-bold rounded-full"
                    :class="{
                      'bg-green-500': result === 'W',
                      'bg-red-500': result === 'L',
                      'bg-yellow-500': result === 'D',
                    }"
                  >
                    {{ result }}
                  </span>
                </div>
                <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Most recent match on the right
                </p>
              </div>

              <!-- Match Statistics Summary -->
              <div class="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 class="text-lg font-medium mb-3 dark:text-white">Season Summary</h4>
                <div class="grid grid-cols-4 gap-4">
                  <div class="text-center">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Played</p>
                    <p class="text-2xl font-bold dark:text-white">
                      {{ teamsStore.gamesPlayed(selectedTeam) }}
                    </p>
                  </div>
                  <div class="text-center">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Won</p>
                    <p class="text-2xl font-bold text-green-600 dark:text-green-400">
                      {{ selectedTeam.wins }}
                    </p>
                  </div>
                  <div class="text-center">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Drawn</p>
                    <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {{ selectedTeam.draws }}
                    </p>
                  </div>
                  <div class="text-center">
                    <p class="text-sm text-gray-500 dark:text-gray-400">Lost</p>
                    <p class="text-2xl font-bold text-red-600 dark:text-red-400">
                      {{ selectedTeam.losses }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- All Matches Table -->
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Match
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Result
                      </th>
                      <th
                        scope="col"
                        class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    <tr
                      v-for="match in teamsStore.teamMatches"
                      :key="match.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td
                        class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                      >
                        {{ match.date }}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <span
                            :class="{ 'font-bold': match.isHome }"
                            class="text-gray-900 dark:text-white"
                          >
                            {{ match.homeTeam }}
                          </span>
                          <span class="mx-2 text-gray-500 dark:text-gray-400">vs</span>
                          <span
                            :class="{ 'font-bold': !match.isHome }"
                            class="text-gray-900 dark:text-white"
                          >
                            {{ match.awayTeam }}
                          </span>
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center space-x-2">
                          <span class="text-gray-900 dark:text-white font-medium">
                            {{ match.homeScore }} - {{ match.awayScore }}
                          </span>
                          <span
                            class="w-6 h-6 flex items-center justify-center text-white text-xs font-bold rounded-full"
                            :class="{
                              'bg-green-500': match.result === 'W',
                              'bg-red-500': match.result === 'L',
                              'bg-yellow-500': match.result === 'D',
                            }"
                          >
                            {{ match.result }}
                          </span>
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <button
                          @click="teamsStore.startEditingMatch(match)"
                          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                        >
                          Edit Result
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- Add this modal for editing team details -->
    <BaseModal
      v-if="teamsStore.isEditingTeamDetails"
      title="Edit Team Details"
      confirm-text="Save Details"
      cancel-text="Cancel"
      @confirm="teamsStore.saveTeamDetails()"
      @close="teamsStore.cancelEditTeamDetails()"
    >
      <div class="space-y-4">
        <UiInputField label="Coach" v-model="teamsStore.editCoach" placeholder="Coach name" />

        <UiInputField label="Stadium" v-model="teamsStore.editStadium" placeholder="Stadium name" />
      </div>
    </BaseModal>
  </NuxtLayout>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  :root {
    font-family: 'Inter', sans-serif;
    color-scheme: normal;
  }
</style>
