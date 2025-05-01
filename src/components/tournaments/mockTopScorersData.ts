
import { StandingsTeam } from './TournamentStandings';

export interface TopScorer {
  id: number;
  name: string;
  team: string;
  teamLogo: string;
  goals: number;
  playGoals: number;
  headGoals: number;
  freeKickGoals: number;
  penaltyGoals: number;
}

export interface PlayerDetails extends TopScorer {
  position: string;
  birthDate: string;
  age: number;
  nationality: string;
  weight: string;
  height: string;
  photo: string;
  matches: {
    total: number;
    starting: number;
    substitute: number;
  };
  minutes: {
    total: number;
    starting: number;
    substitute: number;
  };
  stats: {
    shots: {
      total: number;
      onTarget: number;
      atPost: number;
      inArea: number;
      outsideArea: number;
    };
    corners: {
      total: number;
      executed: number;
    };
    assists: {
      total: number;
      received: number;
    };
    fouls: {
      committed: number;
      received: number;
    };
  };
}

// Serie A top scorers data
export const serieATopScorers: TopScorer[] = [
  { id: 1, name: "Michael Carcelén", team: "Aucas", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 4, playGoals: 1, headGoals: 3, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 2, name: "Jorge Daniel Valencia", team: "Manta F.C.", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 4, playGoals: 3, headGoals: 1, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 3, name: "Ismael Díaz", team: "U. Católica (E)", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 4, playGoals: 2, headGoals: 1, freeKickGoals: 0, penaltyGoals: 1 },
  { id: 4, name: "Octavio Rivero", team: "Barcelona", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 3, playGoals: 2, headGoals: 1, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 5, name: "Jeison Medina", team: "Independiente del Valle", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 3, playGoals: 2, headGoals: 1, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 6, name: "Jonathan Bauman", team: "Liga de Quito", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 3, playGoals: 3, headGoals: 0, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 7, name: "Roberto Ordóñez", team: "Delfín SC", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 3, playGoals: 1, headGoals: 1, freeKickGoals: 0, penaltyGoals: 1 },
  { id: 8, name: "Gabriel Cortez", team: "Orense SC", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 2, playGoals: 1, headGoals: 0, freeKickGoals: 1, penaltyGoals: 0 },
];

// Serie B top scorers data
export const serieBTopScorers: TopScorer[] = [
  { id: 1, name: "Juan Tévez", team: "Gualaceo", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 3, playGoals: 2, headGoals: 0, freeKickGoals: 1, penaltyGoals: 0 },
  { id: 2, name: "Rodrigo Aguirre", team: "9 de Octubre", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 2, playGoals: 1, headGoals: 1, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 3, name: "Carlos Garcés", team: "San Antonio", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 2, playGoals: 2, headGoals: 0, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 4, name: "Ricardo Adé", team: "22 de Julio", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 1, playGoals: 0, headGoals: 1, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 5, name: "José Carabalí", team: "Cumbayá FC", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 1, playGoals: 1, headGoals: 0, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 6, name: "Jean Hurtado", team: "Chacaritas", teamLogo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png", goals: 1, playGoals: 0, headGoals: 0, freeKickGoals: 0, penaltyGoals: 1 },
];

// Libertadores top scorers data
export const libertadoresTopScorers: TopScorer[] = [
  { id: 1, name: "Germán Cano", team: "Fluminense", teamLogo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png", goals: 4, playGoals: 3, headGoals: 0, freeKickGoals: 0, penaltyGoals: 1 },
  { id: 2, name: "Enner Valencia", team: "Internacional", teamLogo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png", goals: 3, playGoals: 2, headGoals: 1, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 3, name: "Rodrigo Aguirre", team: "Universidad de Chile", teamLogo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png", goals: 3, playGoals: 3, headGoals: 0, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 4, name: "Carlos Palacios", team: "Colo Colo", teamLogo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png", goals: 2, playGoals: 0, headGoals: 0, freeKickGoals: 1, penaltyGoals: 1 },
  { id: 5, name: "Pedro Raúl", team: "Botafogo", teamLogo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png", goals: 2, playGoals: 1, headGoals: 1, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 6, name: "Alan Rodríguez", team: "Táchira", teamLogo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png", goals: 2, playGoals: 1, headGoals: 0, freeKickGoals: 1, penaltyGoals: 0 },
  { id: 7, name: "Kendry Páez", team: "Independiente del Valle", teamLogo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png", goals: 2, playGoals: 1, headGoals: 0, freeKickGoals: 1, penaltyGoals: 0 },
];

// Sudamericana top scorers data
export const sudamericanaTopScorers: TopScorer[] = [
  { id: 1, name: "Alexander Alvarado", team: "Liga de Quito", teamLogo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png", goals: 3, playGoals: 2, headGoals: 0, freeKickGoals: 1, penaltyGoals: 0 },
  { id: 2, name: "Eduardo Toro", team: "Palestino", teamLogo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png", goals: 3, playGoals: 1, headGoals: 2, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 3, name: "Renzo Orihuela", team: "Nacional Potosí", teamLogo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png", goals: 2, playGoals: 0, headGoals: 2, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 4, name: "Facundo Suárez", team: "Boston River", teamLogo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png", goals: 2, playGoals: 2, headGoals: 0, freeKickGoals: 0, penaltyGoals: 0 },
  { id: 5, name: "José Sand", team: "Lanús", teamLogo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png", goals: 2, playGoals: 1, headGoals: 0, freeKickGoals: 0, penaltyGoals: 1 },
  { id: 6, name: "Lucas Rodríguez", team: "Cuiabá", teamLogo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png", goals: 2, playGoals: 1, headGoals: 0, freeKickGoals: 1, penaltyGoals: 0 },
];

// Function to get top scorers by tournament ID
export const getTopScorersByTournament = (tournamentId: string): TopScorer[] => {
  switch (tournamentId) {
    case 'serieA':
      return serieATopScorers;
    case 'serieB':
      return serieBTopScorers;
    case 'libertadores':
      return libertadoresTopScorers;
    case 'sudamericana':
      return sudamericanaTopScorers;
    default:
      return [];
  }
};
