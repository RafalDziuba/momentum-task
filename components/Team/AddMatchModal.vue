<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTeamsStore } from '~/stores/teamsModule';
import type { Team } from '~/types';
import BaseModal from '~/components/Modal/BaseModal.vue';

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

// Lista przeciwników (wszystkie drużyny oprócz bieżącej)
const opponentTeams = computed(() => {
  return teamsStore.teams.filter(team => team.id !== props.team.id);
});

const addMatch = () => {
  // Walidacja formularza
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

  // Wywołanie akcji z magazynu do dodania wyniku meczu
  teamsStore.addMatchResult({
    homeTeamId: homeTeamId.value,
    awayTeamId: awayTeamId.value,
    homeScore: homeScore.value,
    awayScore: awayScore.value,
    date: matchDate.value
  });

  // Zamknięcie modalu po dodaniu meczu
  emit('close');
};
</script>

<template>
  <BaseModal title="Add New Match Result" @close="$emit('close')">
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
            class="w-full px-3 py-2 rounded-md border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option :value="null" disabled>Select opponent team</option>
            <option v-for="team in opponentTeams" :key="team.id" :value="team.id">
              {{ team.name }}
            </option>
          </select>
        </div>
      </div>
      
      <!-- Match Date -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Match Date
        </label>
        <input 
          type="date" 
          v-model="matchDate"
          class="w-full px-3 py-2 rounded-md border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>
      
      <!-- Match Score -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Home Score
          </label>
          <input 
            type="number" 
            v-model="homeScore"
            min="0"
            max="10"
            class="w-full px-3 py-2 rounded-md border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Away Score
          </label>
          <input 
            type="number" 
            v-model="awayScore"
            min="0"
            max="10"
            class="w-full px-3 py-2 rounded-md border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div v-if="formError" class="text-red-600 text-sm">
        {{ formError }}
      </div>
      
      <div class="flex justify-end space-x-2">
        <button 
          type="button" 
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button 
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Save Match
        </button>
      </div>
    </form>
  </BaseModal>
</template>
