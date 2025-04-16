<script setup lang="ts">
  import { useTeamsStore } from '~/stores/teamsModule';
  import type { FormattedMatch } from '~/types';
  import FormIndicator from '~/components/FormIndicator.vue';
  import TableHeadCell from '~/components/table/TableHeadCell.vue';
  import ActionButton from '~/components/ActionButton.vue';

  defineProps<{
    matches: FormattedMatch[];
  }>();

  const teamsStore = useTeamsStore();

  const headers = ['Date', 'Match', 'Result', 'Actions'];
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <TableHeadCell v-for="header in headers" :key="header" :label="header" />
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
              <span :class="{ 'font-bold': match.isHome }" class="text-gray-900 dark:text-white">
                {{ match.homeTeam }}
              </span>
              <span class="mx-2 text-gray-500 dark:text-gray-400">vs</span>
              <span :class="{ 'font-bold': !match.isHome }" class="text-gray-900 dark:text-white">
                {{ match.awayTeam }}
              </span>
            </div>
          </td>
          <td class="px-4 py-3 whitespace-nowrap">
            <div class="flex items-center space-x-2">
              <span class="text-gray-900 dark:text-white font-medium">
                {{ match.homeScore }} - {{ match.awayScore }}
              </span>
              <FormIndicator :result="match.result" size="md" />
            </div>
          </td>
          <td class="px-4 py-3 whitespace-nowrap">
            <ActionButton label="Edit Result" @click="teamsStore.startEditingMatch(match)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
