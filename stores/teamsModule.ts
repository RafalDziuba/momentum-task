import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Team, Match, FormattedMatch } from '~/types';
import { MatchResult } from '~/types/enums';

export const useTeamsStore = defineStore('teams', () => {
  // State
  const teams = ref<Team[]>([]);
  const allMatches = ref<Match[]>([]);
  const selectedTeamId = ref<number | null>(null);
  const isLoading = ref(false);
  const isLoadingMatches = ref(false);
  const favoriteTeamId = ref<number | null>(null);
  const teamMatches = ref<FormattedMatch[]>([]);
  const editingMatch = ref<FormattedMatch | null>(null);
  const isEditingResult = ref(false);
  const editHomeScore = ref(0);
  const editAwayScore = ref(0);
  const showEditSuccess = ref(false);
  const isEditingTeamDetails = ref(false);
  const editCoach = ref('');
  const editStadium = ref('');

  // Getters
  const selectedTeam = computed(() => {
    if (!selectedTeamId.value) return null;
    return teams.value.find(team => team.id === selectedTeamId.value);
  });

  const favoriteTeam = computed(() => {
    if (!favoriteTeamId.value || !teams.value.length) return null;
    return teams.value.find(team => team.id === favoriteTeamId.value);
  });

  const gamesPlayed = (team: Team): number => {
    return team.wins + team.draws + team.losses;
  };

  const favoriteTeamRecentMatches = computed(() => {
    if (!favoriteTeamId.value) return [];
    return getTeamMatches(favoriteTeamId.value, 5);
  });

  // Actions
  async function fetchTeams() {
    isLoading.value = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const { data } = await useFetch<{ teams: Team[]; matches: Match[] }>('/data/teams.json');

      allMatches.value = data.value?.matches || [];

      const teamsData = data.value?.teams || [];

      const teamsWithStats = calculateTeamStats(teamsData, allMatches.value);

      const sortedTeams = [...teamsWithStats].sort((a, b) => b.points - a.points);

      sortedTeams.forEach((team, index) => {
        team.position = index + 1;
      });

      teams.value = sortedTeams;
    } catch (error) {
      console.error('Error fetching teams:', error);
      teams.value = [];
      allMatches.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  function selectTeam(teamId: number) {
    selectedTeamId.value = teamId;
    isLoadingMatches.value = true;

    try {
      teamMatches.value = getTeamMatches(teamId);
    } catch (error) {
      console.error('Error fetching team matches:', error);
      teamMatches.value = [];
    } finally {
      isLoadingMatches.value = false;
    }
  }

  function getTeamMatches(teamId: number, limit: number | null = null): FormattedMatch[] {
    if (!teamId || !allMatches.value.length) return [];

    const matches = allMatches.value.filter(
      match => match.homeTeamId === teamId || match.awayTeamId === teamId
    );

    const sortedMatches = [...matches].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const limitedMatches = limit ? sortedMatches.slice(0, limit) : sortedMatches;

    return limitedMatches.map(match => {
      const isHome = match.homeTeamId === teamId;
      const homeTeamObj = teams.value.find(t => t.id === match.homeTeamId);
      const awayTeamObj = teams.value.find(t => t.id === match.awayTeamId);

      let result: MatchResult;
      if (isHome) {
        result =
          match.homeScore > match.awayScore
            ? MatchResult.Win
            : match.homeScore < match.awayScore
            ? MatchResult.Loss
            : MatchResult.Draw;
      } else {
        result =
          match.awayScore > match.homeScore
            ? MatchResult.Win
            : match.awayScore < match.homeScore
            ? MatchResult.Loss
            : MatchResult.Draw;
      }

      return {
        id: match.id,
        date: match.date,
        homeTeam: homeTeamObj?.name || 'Unknown Team',
        awayTeam: awayTeamObj?.name || 'Unknown Team',
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        result,
        isHome,
      };
    });
  }

  function calculateTeamStats(teamsData: Team[], matches: Match[]): Team[] {
    const teamStats: Record<number, Team> = {};

    teamsData.forEach(team => {
      teamStats[team.id] = {
        ...team,
        points: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        recentForm: [],
      };
    });

    matches.forEach(match => {
      const homeTeam = teamStats[match.homeTeamId];
      const awayTeam = teamStats[match.awayTeamId];

      if (!homeTeam || !awayTeam) return;

      homeTeam.goalsFor += match.homeScore;
      homeTeam.goalsAgainst += match.awayScore;
      awayTeam.goalsFor += match.awayScore;
      awayTeam.goalsAgainst += match.homeScore;

      if (match.homeScore > match.awayScore) {
        homeTeam.wins += 1;
        homeTeam.points += 3;
        homeTeam.recentForm.unshift(MatchResult.Win);
        awayTeam.losses += 1;
        awayTeam.recentForm.unshift(MatchResult.Loss);
      } else if (match.homeScore < match.awayScore) {
        awayTeam.wins += 1;
        awayTeam.points += 3;
        awayTeam.recentForm.unshift(MatchResult.Win);
        homeTeam.losses += 1;
        homeTeam.recentForm.unshift(MatchResult.Loss);
      } else {
        homeTeam.draws += 1;
        homeTeam.points += 1;
        homeTeam.recentForm.unshift(MatchResult.Draw);
        awayTeam.draws += 1;
        awayTeam.points += 1;
        awayTeam.recentForm.unshift(MatchResult.Draw);
      }
    });

    Object.values(teamStats).forEach(team => {
      team.recentForm = team.recentForm.slice(0, 5).reverse();

      team.points = team.wins * 3 + team.draws;
    });

    return Object.values(teamStats);
  }

  function toggleFavoriteTeam(team: Team) {
    if (favoriteTeamId.value === team.id) {
      favoriteTeamId.value = null;
      localStorage.removeItem('favoriteTeamId');
    } else {
      favoriteTeamId.value = team.id;
      localStorage.setItem('favoriteTeamId', team.id.toString());
    }
  }

  function startEditingMatch(match: FormattedMatch) {
    editingMatch.value = { ...match };
    editHomeScore.value = match.homeScore;
    editAwayScore.value = match.awayScore;
    isEditingResult.value = true;
  }

  function cancelEditMatch() {
    isEditingResult.value = false;
    editingMatch.value = null;
  }

  function saveMatchResult() {
    if (!editingMatch.value) return;

    if (
      editHomeScore.value < 0 ||
      editHomeScore.value > 7 ||
      editAwayScore.value < 0 ||
      editAwayScore.value > 7
    ) {
      alert('Scores must be between 0 and 7');
      return;
    }

    const matchIndex = allMatches.value.findIndex(m => m.id === editingMatch.value?.id);
    if (matchIndex === -1) return;

    const homeTeamId = allMatches.value[matchIndex].homeTeamId;
    const awayTeamId = allMatches.value[matchIndex].awayTeamId;

    allMatches.value[matchIndex].homeScore = editHomeScore.value;
    allMatches.value[matchIndex].awayScore = editAwayScore.value;

    const teamMatchIndex = teamMatches.value.findIndex(m => m.id === editingMatch.value?.id);
    if (teamMatchIndex !== -1) {
      const updatedMatch = { ...teamMatches.value[teamMatchIndex] };
      updatedMatch.homeScore = editHomeScore.value;
      updatedMatch.awayScore = editAwayScore.value;

      const isHome = updatedMatch.isHome;
      if (isHome) {
        updatedMatch.result =
          editHomeScore.value > editAwayScore.value
            ? MatchResult.Win
            : editHomeScore.value < editAwayScore.value
            ? MatchResult.Loss
            : MatchResult.Draw;
      } else {
        updatedMatch.result =
          editAwayScore.value > editHomeScore.value
            ? MatchResult.Win
            : editAwayScore.value < editHomeScore.value
            ? MatchResult.Loss
            : MatchResult.Draw;
      }

      teamMatches.value[teamMatchIndex] = updatedMatch;
    }

    const teamsData = teams.value.map(team => ({
      ...team,
      points: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      recentForm: [],
    }));

    const teamsWithStats = calculateTeamStats(teamsData, allMatches.value);

    const sortedTeams = [...teamsWithStats].sort((a, b) => {
      // First sort by points
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      // If points are equal, sort by goal difference
      const aGoalDiff = a.goalsFor - a.goalsAgainst;
      const bGoalDiff = b.goalsFor - b.goalsAgainst;
      if (bGoalDiff !== aGoalDiff) {
        return bGoalDiff - aGoalDiff;
      }
      // If goal difference is equal, sort by goals scored
      if (b.goalsFor !== a.goalsFor) {
        return b.goalsFor - a.goalsFor;
      }
      // If everything is equal, sort alphabetically
      return a.name.localeCompare(b.name);
    });

    sortedTeams.forEach((team, index) => {
      team.position = index + 1;
    });

    teams.value = sortedTeams;

    showEditSuccess.value = true;
    setTimeout(() => {
      showEditSuccess.value = false;
    }, 3000);

    isEditingResult.value = false;
    editingMatch.value = null;
  }

  function startEditingTeamDetails() {
    if (!selectedTeam.value) return;

    editCoach.value = selectedTeam.value.coach;
    editStadium.value = selectedTeam.value.stadium;
    isEditingTeamDetails.value = true;
  }

  function cancelEditTeamDetails() {
    editCoach.value = '';
    editStadium.value = '';
    isEditingTeamDetails.value = false;
  }

  function saveTeamDetails() {
    if (!selectedTeam.value) return;

    // Find the team in the teams array
    const teamIndex = teams.value.findIndex(t => t.id === selectedTeam.value?.id);
    if (teamIndex === -1) return;

    // Update the team's coach and stadium
    teams.value[teamIndex].coach = editCoach.value;
    teams.value[teamIndex].stadium = editStadium.value;

    // Update the selected team
    selectedTeam.value.coach = editCoach.value;
    selectedTeam.value.stadium = editStadium.value;

    // Show success message
    showEditSuccess.value = true;
    setTimeout(() => {
      showEditSuccess.value = false;
    }, 3000);

    // Close the modal
    isEditingTeamDetails.value = false;
  }

  return {
    // State
    teams,
    allMatches,
    selectedTeamId,
    isLoading,
    isLoadingMatches,
    favoriteTeamId,
    teamMatches,
    editingMatch,
    isEditingResult,
    editHomeScore,
    editAwayScore,
    showEditSuccess,
    isEditingTeamDetails,
    editCoach,
    editStadium,

    // Getters
    selectedTeam,
    favoriteTeam,
    gamesPlayed,
    favoriteTeamRecentMatches,

    // Actions
    fetchTeams,
    selectTeam,
    getTeamMatches,
    calculateTeamStats,
    toggleFavoriteTeam,
    startEditingMatch,
    cancelEditMatch,
    saveMatchResult,
    startEditingTeamDetails,
    cancelEditTeamDetails,
    saveTeamDetails,
  };
});
