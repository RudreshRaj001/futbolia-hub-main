
// Helper functions for standings

/**
 * Formats a group name for display
 */
export const formatGroupName = (groupId: string): string => {
  switch(groupId) {
    case 'grupo-a': return 'Grupo A';
    case 'grupo-b': return 'Grupo B';
    case 'grupo-c': return 'Grupo C';
    case 'grupo-d': return 'Grupo D';
    case 'grupo-e': return 'Grupo E';
    case 'grupo-f': return 'Grupo F';
    case 'grupo-g': return 'Grupo G';
    case 'grupo-h': return 'Grupo H';
    default: return groupId;
  }
};

/**
 * Format team statistics for display
 */
export const formatTeamStat = (value: number): string => {
  return value.toString();
};

/**
 * Format tournament name
 */
export const formatTournamentName = (tournamentId: string): string => {
  switch(tournamentId) {
    case 'serieA': return 'Liga Pro Serie A';
    case 'serieB': return 'Liga Pro Serie B';
    case 'libertadores': return 'Copa Libertadores';
    case 'sudamericana': return 'Copa Sudamericana';
    default: return tournamentId;
  }
};
