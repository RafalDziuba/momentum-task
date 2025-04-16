<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import BaseModal from '~/components/Modal/BaseModal.vue';
  import TeamInfoBox from '~/components/Modal/TeamInfoBox.vue';
  import TeamHeader from '~/components/Team/TeamHeader.vue';
  import TeamBasicInfo from '~/components/Team/TeamBasicInfo.vue';
  import TeamStats from '~/components/Team/TeamStats.vue';
  import TeamMatchHistory from '~/components/Team/TeamMatchHistory.vue';
  import { useTeamsStore } from '~/stores/teamsModule';

  const teamsStore = useTeamsStore();
  const route = useRoute();

  // Computed property to get selected team from store
  const selectedTeam = computed(() => teamsStore.selectedTeam);

  // Handle loading when the page is directly accessed via URL
  onMounted(async () => {
    // Check if teams are already loaded
    if (teamsStore.teams.length === 0) {
      await teamsStore.fetchTeams();
    }

    // Set selected team based on route parameter
    const teamId = parseInt(route.params.id as string);
    if (teamId && (!selectedTeam.value || selectedTeam.value.id !== teamId)) {
      teamsStore.selectTeam(teamId);
    }
  });

  // Watch for route changes to update selected team
  watch(
    () => route.params.id,
    newId => {
      if (newId) {
        teamsStore.selectTeam(parseInt(newId as string));
      }
    }
  );
</script>

<template>
  <div>
    <UiSpinner v-if="teamsStore.isLoading" />

    <div v-else-if="selectedTeam" class="team-details py-6">
      <TeamHeader :team="selectedTeam" />

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
            <TeamBasicInfo :team="selectedTeam" />
            <TeamStats :team="selectedTeam" />
          </div>
        </div>

        <!-- Match History Section -->
        <TeamMatchHistory :team="selectedTeam" />
      </div>
    </div>
  </div>

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

  <!-- Modal for editing team details -->
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
</template>
