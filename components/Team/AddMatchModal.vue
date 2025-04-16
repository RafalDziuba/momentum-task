<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTeamsStore } from '~/stores/teamsModule';
import type { Team } from '~/types';
import BaseModal from '~/components/Modal/BaseModal.vue';
import InputField from '~/components/ui/InputField.vue';

const props = defineProps<{
  team: Team;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const teamsStore = useTeamsStore();
const homeTeamId = ref(props.team.id);
const awayTeamId = ref<number | null>(null);
const homeScore = ref(0);
const awayScore = ref(0);
const matchDate = ref(new Date().toISOString().split('T')[0]); // Format: YYYY-MM-DD
const formError = ref('');

const opponentTeams = computed(() => {
  return teamsStore.teams.filter(team => team.id !== props.team.id);
});

const addMatch = () => {
  if (!awayTeamId.value) {
    formError.value = 'Please select an opponent team';
    return;
  }
  
  if (homeScore.value < 0 || homeScore.value > 10 || awayScore.value < 0 || awayScore.value > 10) {
    formError.value = 'Scores must be between 0 and 10';
    return;
  }

  if (!matchDate.value) {
    formError.value = 'Please select a date';
    return;
  }

  teamsStore.addMatchResult({
    homeTeamId: homeTeamId.value,
    awayTeamId: awayTeamId.value,
    homeScore: Number(homeScore.value),
    awayScore: Number(awayScore.value),
    date: matchDate.value
  });

  emit('close');
};
</script>

<template>
  <BaseModal 
    title="Add New Match Result" 
    @close="$emit('close')" 
    @confirm="addMatch"
    confirmText="Save Match"
    cancelText="Cancel"
  >
    <form @submit.prevent="addMatch" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <!-- Home Team (Selected team) -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Home Team
          </label>
          <div class="py-2 px-3 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
            {{ props.team.name }}
          </div>
        </div>

        <!-- Away Team (Dropdown) -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Away Team
          </label>
          <select 
            v-model="awayTeamId"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option :value="null" disabled>Select opponent</option>
            <option v-for="team in opponentTeams" :key="team.id" :value="team.id">
              {{ team.name }}
            </option>
          </select>
        </div>
      </div>
      
      <!-- Match Date -->
      <InputField
        label="Match Date"
        type="date"
        v-model="matchDate"
      />
      
      <!-- Match Score -->
      <div class="grid grid-cols-2 gap-4">
        <InputField
          label="Home Score"
          type="number"
          v-model="homeScore"
          min="0"
          max="10"
        />
        <InputField
          label="Away Score"
          type="number"
          v-model="awayScore"
          min="0"
          max="10"
        />
      </div>

      <div v-if="formError" class="text-red-600 text-sm">
        {{ formError }}
      </div>
    </form>
  </BaseModal>
</template>
