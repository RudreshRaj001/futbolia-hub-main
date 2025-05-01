// Mock data for player information in tournaments

import { PlayerInfo } from './types';

// Mock players data
const players: PlayerInfo[] = [
  { id: 1, name: "Francisco Fydriszewski", position: "Delantero", birthdate: "1993-04-16", age: 30, nationality: "Argentina", height: "1.87m", weight: "84kg"},
  { id: 2, name: "Leonel Quiñónez", position: "Defensor", birthdate: "1991-02-04", age: 32, nationality: "Ecuador", height: "1.76m", weight: "70kg"},
  { id: 3, name: "Bryan Carabalí", position: "Defensor", birthdate: "1997-01-10", age: 26, nationality: "Ecuador", height: "1.75m", weight: "68kg"},
  { id: 4, name: "Damián Díaz", position: "Volante", birthdate: "1986-05-01", age: 37, nationality: "Argentina/Ecuador", height: "1.68m", weight: "65kg"},
  { id: 5, name: "Janner Corozo", position: "Delantero", birthdate: "1995-07-27", age: 27, nationality: "Ecuador", height: "1.72m", weight: "68kg"},
  { id: 6, name: "Luca Sosa", position: "Volante", birthdate: "1999-12-05", age: 23, nationality: "Argentina", height: "1.78m", weight: "72kg"},
  { id: 7, name: "Aníbal Chalá", position: "Defensor", birthdate: "1996-05-09", age: 27, nationality: "Ecuador", height: "1.71m", weight: "67kg"},
  { id: 8, name: "Matías Oyola", position: "Volante", birthdate: "1982-09-07", age: 41, nationality: "Argentina/Ecuador", height: "1.74m", weight: "75kg"},
  { id: 9, name: "Joao Rojas", position: "Delantero", birthdate: "1997-08-08", age: 26, nationality: "Ecuador", height: "1.73m", weight: "70kg"},
  { id: 10, name: "Carlos Garcés", position: "Delantero", birthdate: "1990-04-01", age: 33, nationality: "Ecuador", height: "1.82m", weight: "78kg"},
  // Liga de Quito players
  { id: 11, name: "Adrián Gabbarini", position: "Arquero", birthdate: "1985-10-10", age: 38, nationality: "Argentina", height: "1.89m", weight: "85kg"},
  { id: 12, name: "Moisés Corozo", position: "Defensor", birthdate: "1992-03-25", age: 31, nationality: "Ecuador", height: "1.78m", weight: "75kg"},
  { id: 13, name: "Luis Caicedo", position: "Defensor", birthdate: "1992-05-11", age: 31, nationality: "Ecuador", height: "1.83m", weight: "78kg"},
  { id: 14, name: "José Quintero", position: "Defensor", birthdate: "1990-12-15", age: 32, nationality: "Ecuador", height: "1.75m", weight: "70kg"},
  { id: 15, name: "Alexander Alvarado", position: "Volante", birthdate: "1999-04-21", age: 24, nationality: "Ecuador", height: "1.70m", weight: "65kg"},
];

// Maps each team to its players
const teamPlayers: Record<number, number[]> = {
  1: [1, 2, 3, 4, 5], // Barcelona SC
  2: [6, 7, 8, 9, 10], // Emelec
  3: [11, 12, 13, 14, 15], // Liga de Quito
  4: [1, 6, 11], // Independiente del Valle (using players from other teams for demo)
  5: [2, 7, 12], // Aucas (using players from other teams for demo)
  6: [3, 8, 13], // Universidad Católica (using players from other teams for demo)
  7: [4, 9, 14], // Delfín SC (using players from other teams for demo)
  8: [5, 10, 15] // Mushuc Runa (using players from other teams for demo)
};

// Define the TeamStats type to match what's used in the application
export interface TeamStats {
  matches: number;
  matches_wins: number;
  matches_draws: number;
  matches_losses: number;
  goals_for: number;
  goals_against: number;
  possession: number;
  passes: number;
  shots: number;
  shotsOnTarget: number;
  current_form?: string;
  // Additional fields needed by TeamCompare
  goals: number; // Alias for goals_for for compatibility
  conceded: number; // Alias for goals_against for compatibility
  corners: number;
  foulsCommitted: number;
  yellowCards: number;
  redCards: number;
}

// Mock team statistics
export const teamStats: Record<number, TeamStats> = {
  1: { 
    matches: 15, 
    matches_wins: 9, 
    matches_draws: 3, 
    matches_losses: 3, 
    goals_for: 28, 
    goals_against: 15, 
    possession: 55, 
    passes: 450, 
    shots: 180, 
    shotsOnTarget: 70,
    current_form: "WWDL",
    goals: 28, // Same as goals_for
    conceded: 15, // Same as goals_against
    corners: 78,
    foulsCommitted: 45,
    yellowCards: 12,
    redCards: 2
  },
  2: { 
    matches: 15, 
    matches_wins: 7, 
    matches_draws: 4, 
    matches_losses: 4, 
    goals_for: 22, 
    goals_against: 18, 
    possession: 52, 
    passes: 420, 
    shots: 160, 
    shotsOnTarget: 60,
    current_form: "WLWD",
    goals: 22, // Same as goals_for
    conceded: 18, // Same as goals_against
    corners: 65,
    foulsCommitted: 38,
    yellowCards: 10,
    redCards: 1
  },
  3: { 
    matches: 15, 
    matches_wins: 10, 
    matches_draws: 2, 
    matches_losses: 3, 
    goals_for: 30, 
    goals_against: 14, 
    possession: 58, 
    passes: 470, 
    shots: 190, 
    shotsOnTarget: 80,
    current_form: "WWWL",
    goals: 30, // Same as goals_for
    conceded: 14, // Same as goals_against
    corners: 82,
    foulsCommitted: 42,
    yellowCards: 11,
    redCards: 0
  },
  4: { 
    matches: 15, 
    matches_wins: 8, 
    matches_draws: 4, 
    matches_losses: 3, 
    goals_for: 25, 
    goals_against: 16, 
    possession: 56, 
    passes: 460, 
    shots: 175, 
    shotsOnTarget: 65,
    current_form: "DWWD",
    goals: 25, // Same as goals_for
    conceded: 16, // Same as goals_against
    corners: 72,
    foulsCommitted: 40,
    yellowCards: 8,
    redCards: 1
  },
  5: { 
    matches: 15, 
    matches_wins: 6, 
    matches_draws: 5, 
    matches_losses: 4, 
    goals_for: 20, 
    goals_against: 19, 
    possession: 50, 
    passes: 400, 
    shots: 150, 
    shotsOnTarget: 55,
    current_form: "DLWW",
    goals: 20, // Same as goals_for
    conceded: 19, // Same as goals_against
    corners: 63,
    foulsCommitted: 35,
    yellowCards: 9,
    redCards: 2
  }
};

// Top scorer data
export const topScorers = [
  { id: 1, name: "Francisco Fydriszewski", team: "Barcelona SC", goals: 12, assists: 3 },
  { id: 2, name: "Joao Rojas", team: "Emelec", goals: 10, assists: 6 },
  { id: 3, name: "Alexander Alvarado", team: "Liga de Quito", goals: 9, assists: 7 },
  { id: 4, name: "Carlos Garcés", team: "Mushuc Runa", goals: 8, assists: 2 },
  { id: 5, name: "Damián Díaz", team: "Barcelona SC", goals: 7, assists: 9 },
];

// Player statistics for individual player performance
export const playerStats: Record<number, {
  goals: number;
  assists: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  matches: number;
}> = {
  1: { goals: 12, assists: 3, shots: 45, shotsOnTarget: 28, passes: 320, yellowCards: 2, redCards: 0, minutesPlayed: 1250, matches: 14 },
  2: { goals: 2, assists: 4, shots: 12, shotsOnTarget: 5, passes: 480, yellowCards: 4, redCards: 0, minutesPlayed: 1300, matches: 15 },
  3: { goals: 1, assists: 3, shots: 10, shotsOnTarget: 4, passes: 450, yellowCards: 3, redCards: 1, minutesPlayed: 1200, matches: 14 },
  4: { goals: 7, assists: 9, shots: 38, shotsOnTarget: 22, passes: 520, yellowCards: 1, redCards: 0, minutesPlayed: 1350, matches: 15 },
  5: { goals: 6, assists: 5, shots: 32, shotsOnTarget: 18, passes: 380, yellowCards: 2, redCards: 0, minutesPlayed: 1100, matches: 13 },
  6: { goals: 4, assists: 3, shots: 25, shotsOnTarget: 12, passes: 410, yellowCards: 5, redCards: 0, minutesPlayed: 1250, matches: 14 },
  7: { goals: 3, assists: 5, shots: 15, shotsOnTarget: 8, passes: 470, yellowCards: 3, redCards: 0, minutesPlayed: 1300, matches: 15 },
  8: { goals: 2, assists: 7, shots: 20, shotsOnTarget: 10, passes: 550, yellowCards: 2, redCards: 0, minutesPlayed: 1320, matches: 15 },
  9: { goals: 10, assists: 6, shots: 42, shotsOnTarget: 25, passes: 350, yellowCards: 1, redCards: 0, minutesPlayed: 1280, matches: 15 },
  10: { goals: 8, assists: 2, shots: 36, shotsOnTarget: 20, passes: 280, yellowCards: 3, redCards: 1, minutesPlayed: 1150, matches: 13 },
  11: { goals: 0, assists: 1, shots: 2, shotsOnTarget: 1, passes: 420, yellowCards: 0, redCards: 0, minutesPlayed: 1350, matches: 15 },
  12: { goals: 1, assists: 3, shots: 10, shotsOnTarget: 4, passes: 460, yellowCards: 4, redCards: 0, minutesPlayed: 1300, matches: 15 },
  13: { goals: 2, assists: 1, shots: 12, shotsOnTarget: 6, passes: 440, yellowCards: 3, redCards: 0, minutesPlayed: 1280, matches: 15 },
  14: { goals: 1, assists: 4, shots: 15, shotsOnTarget: 7, passes: 430, yellowCards: 2, redCards: 1, minutesPlayed: 1200, matches: 14 },
  15: { goals: 9, assists: 7, shots: 40, shotsOnTarget: 24, passes: 390, yellowCards: 1, redCards: 0, minutesPlayed: 1320, matches: 15 },
};
