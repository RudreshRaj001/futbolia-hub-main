// Tournament types

// Tournament sections
export type TournamentSection = 'calendario' | 'posiciones' | 'goleadores' | 'equipos' | 'noticias' | 'comparativa';

// Tournament phase types
export type TournamentPhase = 'fase-inicial' | 'fase-final-i' | 'fase-final-ii' | 'fase-de-grupos' | 'octavos' | 'cuartos' | 'semifinales' | 'finales';

// Tournament group types
export type TournamentGroup = 'grupo-a' | 'grupo-b' | 'grupo-c' | 'grupo-d' | 'grupo-e' | 'grupo-f' | 'grupo-g' | 'grupo-h';

export interface Team {
  id: number;
  name: string;
  logo: string;
  country?: string;
}

// Optional: Used in tournamentNews[]
export interface TournamentNews {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface Phase {
  id: TournamentPhase;
  name: string;
}

export interface Group {
  id: TournamentGroup;
  name: string;
}


// Match definition
export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  status: 'scheduled' | 'live' | 'finished';
  matchday: number;
  phase: TournamentPhase;
  tournament: string;
  group?: TournamentGroup;
}


// Tournament definition
export interface Tournament {
  id: string;
  name: string;
  shortName?: string;
  country?: string;
  season?: number;
  logo?: string;
  startDate?: string;
  endDate?: string;
  phases: Phase[];
  groups: Group[];
  matchdays: number[];
  matches: Match[];
}

// Team in standings
export interface TeamStanding {
  position: number;
  teamId?: number;
  teamName?: string;
  name?: string;
  teamLogo?: string;
  logo?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form?: string[];  // last 5 matches: 'W', 'D', 'L'
  group?: string; // for tournaments with groups
  id?: string | number; // Change from string to string | number to match StandingsTeam
}

// Top Scorer
export interface TopScorer {
  id: number;
  playerName?: string;
  name?: string;
  teamId?: number;
  team?: string;
  teamName?: string;
  teamLogo?: string;
  goals: number;
  assists?: number;
  penalties?: number;
  matches?: number;
  minutes?: number;
  position?: string;
  nationality?: string;
  playerImage?: string;
  playGoals?: number;
  headGoals?: number;
  freeKickGoals?: number;
  penaltyGoals?: number;
}

// Add the PlayerInfo interface
export interface PlayerInfo {
  id: number;
  name: string;
  position: string;
  birthdate: string;
  age: number;
  nationality: string;
  height: string;
  weight: string;
}
