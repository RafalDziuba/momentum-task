<script setup lang="ts">
  import { useTeamsStore } from '~/stores/teamsModule';
  import type { Team } from '~/types';
  import CalendarIcon from '../icons/CalendarIcon.vue';
  import StadiumIcon from '../icons/StadiumIcon.vue';
  import PersonIcon from '../icons/PersonIcon.vue';
  import TeamInfoItem from '~/components/Team/TeamInfoItem.vue';
  import ActionButton from '~/components/ActionButton.vue';

  defineProps<{
    team: Team;
  }>();

  const teamsStore = useTeamsStore();
</script>

<template>
  <div>
    <div class="flex items-center mb-4">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ team.name }}
      </h2>
      <span
        class="ml-3 px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      >
        #{{ team.position }}
      </span>
    </div>

    <div class="space-y-3">
      <TeamInfoItem label="Founded" :value="team.founded">
        <template #icon><CalendarIcon /></template>
      </TeamInfoItem>

      <TeamInfoItem label="Stadium" :value="team.stadium">
        <template #icon><StadiumIcon /></template>
        <template #action>
          <ActionButton
            label="Edit"
            size="sm"
            @click="teamsStore.startEditingTeamDetails()"
            class="ml-2"
          />
        </template>
      </TeamInfoItem>

      <TeamInfoItem label="Coach" :value="team.coach">
        <template #icon><PersonIcon /></template>
      </TeamInfoItem>
    </div>
  </div>
</template>
