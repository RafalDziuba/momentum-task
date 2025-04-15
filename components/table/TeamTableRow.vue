<script setup lang="ts">
import type { Team } from '../../types';
import { useTeamsStore } from '../../stores/teamsModule';
import TableCell from './TableCell.vue';
import FavoriteStar from '../FavoriteStar.vue';
import FormIndicator from '../FormIndicator.vue';

const teamsStore = useTeamsStore();

defineProps({
  team: {
    type: Object as () => Team,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click', 'toggleFavorite']);
</script>

<template>
  <tr
    @click="emit('click', team.id)"
    class="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
    :class="{
      'bg-blue-50 dark:bg-blue-900/20': isFavorite,
    }"
  >
    <TableCell :value="team.position" />
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="text-sm font-medium text-gray-900 dark:text-white">
          {{ team.name }}
        </div>
        <FavoriteStar 
          :is-favorite="isFavorite" 
          @toggle="emit('toggleFavorite', team)" 
        />
      </div>
    </td>
    <TableCell :value="team.points" />
    <TableCell :value="teamsStore.gamesPlayed(team)" />
    <TableCell :value="team.wins" />
    <TableCell :value="team.draws" />
    <TableCell :value="team.losses" />
    <TableCell :value="team.goalsFor" />
    <TableCell :value="team.goalsAgainst" />
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex space-x-1">
        <FormIndicator
          v-for="(result, index) in team.recentForm"
          :key="index"
          :result="result"
        />
      </div>
    </td>
  </tr>
</template>
