<script setup lang="ts">
import { useTeamsStore } from '~/stores/teamsModule';
import type { FormattedMatch } from '~/types';

defineProps<{
  matches: FormattedMatch[];
}>();

const teamsStore = useTeamsStore();
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Date
          </th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Match
          </th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Result
          </th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        <tr 
          v-for="match in matches" 
          :key="match.id"
          class="hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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
</template>
