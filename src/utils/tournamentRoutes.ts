import { Transfer } from "@/store/slices/transfersSlice";

// Static tournament route mappings for backwards compatibility
export const staticTournamentRoutes: Record<string, string> = {
  'serieA': 'liga-pro-serie-a',
  'serieB': 'liga-pro-serie-b',
  'libertadores': 'copa-libertadores',
  'sudamericana': 'copa-sudamericana',
  'eurocopas': 'copa-america',
  'eurocopas2': 'euro',
  'champions': 'champions-league',
  'europa': 'europa-league',
  'laliga': 'laliga',
  'premier': 'premier-league',
  'serieAItalia': 'serie-a-italia',
  'bundesliga': 'bundesliga',
  'ligue1': 'ligue-1',
  'olympics': 'olympics'
};

// Dynamic tournament routes that will be updated from API data
export let tournamentRoutes: Record<string, string> = { ...staticTournamentRoutes };

// Dynamic reverse mapping
export let reverseRouteMap: Record<string, string> = 
  Object.entries(tournamentRoutes).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {} as Record<string, string>);

// Function to update tournament routes from API data
export const updateTournamentRoutes = (apiTournaments: { id: number | string; name: string }[]) => {
  // Simply assign id to itself (identity mapping)
  const newRoutes: Record<string, string> = {};

 

  apiTournaments.forEach(tournament => {
    const id = tournament.id.toString();
    newRoutes[id] = id; // 👈 no slugifying
  });

  tournamentRoutes = newRoutes;

  reverseRouteMap = Object.entries(tournamentRoutes).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {} as Record<string, string>);

  return { tournamentRoutes, reverseRouteMap };
};


// Tournament phase mappings for different tournaments
export const tournamentPhaseLabels: Record<string, Record<string, string>> = {
  'serieA': {
    'fase-inicial': 'FASE INICIAL',
    'fase-final-i': 'FASE FINAL I',
    'fase-final-ii': 'FASE FINAL II',
    'grupo-descenso': 'GRUPO DESCENSO',
    'acumulada': 'ACUMULADA'
  },
  'serieB': {
    'fase-de-clasificacion': 'FASE DE CLASIFICACIÓN',
    'hexagonal-de-ascenso': 'HEXAGONAL DE ASCENSO',
    'hexagonal-de-descenso': 'HEXAGONAL DE DESCENSO',
    'acumulada': 'ACUMULADA'
  },
  'libertadores': {
    'fase-de-grupos': 'FASE DE GRUPOS',
    'octavos': 'OCTAVOS DE FINAL',
    'cuartos': 'CUARTOS DE FINAL',
    'semifinales': 'SEMIFINALES',
    'finales': 'FINAL'
  },
  'sudamericana': {
    'fase-de-grupos': 'FASE DE GRUPOS',
    'octavos': 'OCTAVOS DE FINAL',
    'cuartos': 'CUARTOS DE FINAL',
    'semifinales': 'SEMIFINALES',
    'finales': 'FINAL'
  },
  'champions': {
    'fase-de-grupos': 'FASE DE GRUPOS',
    'octavos': 'OCTAVOS DE FINAL',
    'cuartos': 'CUARTOS DE FINAL',
    'semifinales': 'SEMIFINALES',
    'finales': 'FINAL'
  },
  'europa': {
    'fase-de-grupos': 'FASE DE GRUPOS',
    'dieciseisavos': 'DIECISEISAVOS DE FINAL',
    'octavos': 'OCTAVOS DE FINAL',
    'cuartos': 'CUARTOS DE FINAL',
    'semifinales': 'SEMIFINALES',
    'finales': 'FINAL'
  }
};

// Generic phase labels for new tournaments
export const genericPhaseLabels: Record<string, string> = {
  'fase-de-grupos': 'FASE DE GRUPOS',
  'octavos': 'OCTAVOS DE FINAL',
  'cuartos': 'CUARTOS DE FINAL',
  'semifinales': 'SEMIFINALES',
  'finales': 'FINAL'
};

// utils/convertTransfersToTeamView.ts
 // adjust the path if needed

export function convertTransfersToTeamView(data: Transfer[]) {
  const teamMap: Record<string, {
    teamName: string;
    teamLogo: string;
    highs: string[];
    lows: string[];
  }> = {};

  for (const entry of data) {
    for (const transfer of entry.transfers) {
      const playerName = entry.player.name;

      const inTeam = transfer.teams.in;
      if (!teamMap[inTeam.name]) {
        teamMap[inTeam.name] = {
          teamName: inTeam.name,
          teamLogo: inTeam.logo,
          highs: [],
          lows: [],
        };
      }
      if (!teamMap[inTeam.name].highs.includes(playerName)) {
        teamMap[inTeam.name].highs.push(playerName);
      }

      const outTeam = transfer.teams.out;
      if (!teamMap[outTeam.name]) {
        teamMap[outTeam.name] = {
          teamName: outTeam.name,
          teamLogo: outTeam.logo,
          highs: [],
          lows: [],
        };
      }
      if (!teamMap[outTeam.name].lows.includes(playerName)) {
        teamMap[outTeam.name].lows.push(playerName);
      }
    }
  }

  return Object.values(teamMap);
}

