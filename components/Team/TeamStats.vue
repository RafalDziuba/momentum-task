<script setup lang="ts">
import type { Team } from '~/types';
import TeamStatBox from './TeamStatBox.vue';

defineProps<{
  team: Team
}>();
</script>

<template>
  <div>
    <h3 class="text-xl font-semibold mb-4 dark:text-white">Team Stats</h3>
    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <TeamStatBox label="Points" :value="team.points" />
      <TeamStatBox label="Goals Scored" :value="team.goalsFor" />
      <TeamStatBox label="Goals Conceded" :value="team.goalsAgainst" />
    </div>
  </div>
</template>
