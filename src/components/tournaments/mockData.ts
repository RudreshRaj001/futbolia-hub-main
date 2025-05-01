import { Tournament, Match } from './types';

// Generate mock matches
const generateMatches = (tournamentId: string, phasePrefix: string): Match[] => {
  const teamLogos = [
    "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png",
    "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png",
    "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png",
  ];

  const teams = {
    serieA: ["Mushuc Runa", "Vinchinto", "U.Católica", "Manta F.C.", "Libertad FC", "Orense", "Delfin", "D. Cuenca"],
    serieB: ["9 De Octubre", "22 De Julio", "San Antonio", "Independiente", "Cumbayá FC", "At Vinchinto", "Gualaeo", "Chacaritas", "Imbabura", "CP Leones Del Norte", "Vargas Torres", "Guayaquil City"],
    libertadores: ["Carabobo", "Estudiantes", "U. De Chile", "Botafogo"],
    sudamericana: ["LDU Quito", "Barcelona SC", "Emelec", "Independiente del Valle"],
    champions: ["Real Madrid", "Manchester City", "Bayern Munich", "PSG", "Inter", "Barcelona", "Arsenal", "Napoli"]
  };

  const matches: Match[] = [];
  
  // Generate matches for different phases and matchdays
  const phases = phasePrefix === 'fase-de-grupos' 
    ? ['fase-de-grupos'] 
    : ['fase-inicial', 'fase-final-i', 'fase-final-ii'];
  
  const groups = ['grupo-a', 'grupo-b', 'grupo-c', 'grupo-d', 'grupo-e', 'grupo-f', 'grupo-g', 'grupo-h'];
  
  // Create matches for each phase and matchday
  phases.forEach(phase => {
    for (let matchday = 1; matchday <= 5; matchday++) {
      // Generate a date for this matchday
      const baseDate = new Date();
      baseDate.setDate(baseDate.getDate() - 5 + matchday);
      
      const tourTeams = teams[tournamentId as keyof typeof teams] || teams.serieA;
      
      // Create 2-4 matches per matchday
      const matchCount = Math.floor(Math.random() * 3) + 2;
      
      for (let i = 0; i < matchCount; i++) {
        const homeTeamIndex = Math.floor(Math.random() * tourTeams.length);
        let awayTeamIndex = Math.floor(Math.random() * tourTeams.length);
        
        // Ensure home and away teams are different
        while (awayTeamIndex === homeTeamIndex) {
          awayTeamIndex = Math.floor(Math.random() * tourTeams.length);
        }
        
        const isFinished = matchday < 4 || (matchday === 4 && Math.random() > 0.5);
        const matchDate = baseDate.toISOString();
        
        const match: Match = {
          id: matches.length + 1,
          homeTeam: tourTeams[homeTeamIndex],
          awayTeam: tourTeams[awayTeamIndex],
          homeLogo: teamLogos[Math.floor(Math.random() * teamLogos.length)],
          awayLogo: teamLogos[Math.floor(Math.random() * teamLogos.length)],
          homeScore: isFinished ? Math.floor(Math.random() * 4) : undefined,
          awayScore: isFinished ? Math.floor(Math.random() * 4) : undefined,
          date: matchDate,
          status: isFinished ? 'finished' : 'scheduled',
          matchday: matchday,
          phase: phase as any,
          tournament: tournamentId
        };
        
        // Add group for group phase
        if (phase === 'fase-de-grupos') {
          match.group = groups[Math.floor(Math.random() * groups.length)] as any;
        }
        
        matches.push(match);
      }
    }
  });
  
  return matches;
};

// Mock tournaments data
// export const mockTournaments: Tournament[] = [
//   {
//     id: "serieA",
//     name: "Liga Pro Serie A",
//     shortName: "Serie A",
//     country: "Ecuador",
//     season: 2024,
//     logo: "/lovable-uploads/serie-a-logo.png",
//     startDate: "2024-01-01",
//     endDate: "2024-12-31",
//     phases: [
//       { id: 'fase-inicial', name: 'Fase Inicial' },
//       { id: 'fase-final-i', name: 'Fase Final I' },
//       { id: 'fase-final-ii', name: 'Fase Final II' }
//     ],
//     groups: [],
//     matchdays: Array.from({ length: 30 }, (_, i) => i + 1),
//     matches: generateMatches("serieA", 'fase-inicial')
//   },
//   {
//     id: "serieB",
//     name: "Liga Pro Serie B",
//     shortName: "Serie B",
//     phases: [
//       { id: 'fase-de-clasificacion', name: 'Fase De Clasificación' },
//       { id: 'hexagonal-de-ascenso', name: 'Hexagonal De Ascenso' },
//       { id: 'hexagonal-de-descenso', name: 'Hexagonal De Descenso' }
//     ],
//     groups: [],
//     matchdays: Array.from({ length: 22 }, (_, i) => i + 1),
//     matches: generateMatches("serieB", 'fase-inicial')
//   },
//   {
//     id: "libertadores",
//     name: "Copa Libertadores",
//     shortName: "Libertadores",
//     country: "South America",
//     season: 2024,
//     logo: "/lovable-uploads/libertadores-logo.png",
//     startDate: "2024-02-01",
//     endDate: "2024-11-30",
//     phases: [
//       { id: 'fase-de-grupos', name: 'Fase De Grupos' },
//       { id: 'octavos', name: 'Octavos De Final' },
//       { id: 'cuartos', name: 'Cuartos De Final' },
//       { id: 'semifinales', name: 'Semifinales' },
//       { id: 'finales', name: 'Finales' }
//     ],
//     groups: [
//       { id: 'grupo-a', name: 'GRUPO A' },
//       { id: 'grupo-b', name: 'GRUPO B' },
//       { id: 'grupo-c', name: 'GRUPO C' },
//       { id: 'grupo-d', name: 'GRUPO D' },
//       { id: 'grupo-e', name: 'GRUPO E' },
//       { id: 'grupo-f', name: 'GRUPO F' },
//       { id: 'grupo-g', name: 'GRUPO G' },
//       { id: 'grupo-h', name: 'GRUPO H' }
//     ],
//     matchdays: Array.from({ length: 6 }, (_, i) => i + 1),
//     matches: generateMatches("libertadores", 'fase-de-grupos')
//   },
//   {
//     id: "sudamericana",
//     name: "Copa Sudamericana",
//     shortName: "Sudamericana",
//     country: "South America",
//     season: 2024,
//     logo: "/lovable-uploads/sudamericana-logo.png",
//     startDate: "2024-02-15",
//     endDate: "2024-11-15",
//     phases: [
//       { id: 'fase-de-grupos', name: 'Fase De Grupos' },
//       { id: 'octavos', name: 'Octavos De Final' },
//       { id: 'cuartos', name: 'Cuartos De Final' },
//       { id: 'semifinales', name: 'Semifinales' },
//       { id: 'finales', name: 'Finales' }
//     ],
//     groups: [
//       { id: 'grupo-a', name: 'GRUPO A' },
//       { id: 'grupo-b', name: 'GRUPO B' },
//       { id: 'grupo-c', name: 'GRUPO C' },
//       { id: 'grupo-d', name: 'GRUPO D' },
//       { id: 'grupo-e', name: 'GRUPO E' },
//       { id: 'grupo-f', name: 'GRUPO F' },
//       { id: 'grupo-g', name: 'GRUPO G' },
//       { id: 'grupo-h', name: 'GRUPO H' }
//     ],
//     matchdays: Array.from({ length: 6 }, (_, i) => i + 1),
//     matches: generateMatches("sudamericana", 'fase-de-grupos')
//   },
//   {
//     id: "eurocopas",
//     name: "Eurocopa 2024",
//     shortName: "Euro 2024",
//     phases: [
//       { id: 'fase-de-grupos', name: 'Fase De Grupos' },
//       { id: 'octavos', name: 'Octavos De Final' },
//       { id: 'cuartos', name: 'Cuartos De Final' },
//       { id: 'semifinales', name: 'Semifinales' },
//       { id: 'finales', name: 'Finales' },
//     ],
//     groups: [
//       { id: 'grupo-a', name: 'GRUPO A' },
//       { id: 'grupo-b', name: 'GRUPO B' },
//       { id: 'grupo-c', name: 'GRUPO C' },
//       { id: 'grupo-d', name: 'GRUPO D' },
//       { id: 'grupo-e', name: 'GRUPO E' },
//       { id: 'grupo-f', name: 'GRUPO F' },
//     ],
//     matchdays: Array.from({ length: 3 }, (_, i) => i + 1),
//     matches: generateMatches("eurocopas", 'fase-de-grupos')
//   },
//   {
//     id: "champions",
//     name: "Champions League",
//     shortName: "Champions",
//     country: "Europe",
//     season: 2024,
//     logo: "/lovable-uploads/champions-logo.png",
//     startDate: "2024-09-15",
//     endDate: "2025-05-30",
//     phases: [
//       { id: 'fase-de-grupos', name: 'Fase De Grupos' },
//       { id: 'octavos', name: 'Octavos De Final' },
//       { id: 'cuartos', name: 'Cuartos De Final' },
//       { id: 'semifinales', name: 'Semifinales' },
//       { id: 'finales', name: 'Finales' }
//     ],
//     groups: [
//       { id: 'grupo-a', name: 'GRUPO A' },
//       { id: 'grupo-b', name: 'GRUPO B' },
//       { id: 'grupo-c', name: 'GRUPO C' },
//       { id: 'grupo-d', name: 'GRUPO D' },
//       { id: 'grupo-e', name: 'GRUPO E' },
//       { id: 'grupo-f', name: 'GRUPO F' },
//       { id: 'grupo-g', name: 'GRUPO G' },
//       { id: 'grupo-h', name: 'GRUPO H' }
//     ],
//     matchdays: Array.from({ length: 6 }, (_, i) => i + 1),
//     matches: generateMatches("champions", 'fase-de-grupos')
//   },
//   {
//     id: "europa",
//     name: "Europa League",
//     shortName: "Europa",
//     phases: [
//       { id: 'fase-de-grupos', name: 'Fase De Grupos' },
//       { id: 'dieciseisavos', name: 'Dieciseisavos' },
//       { id: 'octavos', name: 'Octavos De Final' },
//       { id: 'cuartos', name: 'Cuartos De Final' },
//       { id: 'semifinales', name: 'Semifinales' },
//       { id: 'finales', name: 'Finales' },
//     ],
//     groups: [
//       { id: 'grupo-a', name: 'GRUPO A' },
//       { id: 'grupo-b', name: 'GRUPO B' },
//       { id: 'grupo-c', name: 'GRUPO C' },
//       { id: 'grupo-d', name: 'GRUPO D' },
//       { id: 'grupo-e', name: 'GRUPO E' },
//       { id: 'grupo-f', name: 'GRUPO F' },
//       { id: 'grupo-g', name: 'GRUPO G' },
//       { id: 'grupo-h', name: 'GRUPO H' },
//     ],
//     matchdays: Array.from({ length: 6 }, (_, i) => i + 1),
//     matches: generateMatches("europa", 'fase-de-grupos')
//   },
//   {
//     id: "laliga",
//     name: "LaLiga España",
//     shortName: "LaLiga",
//     phases: [],
//     groups: [],
//     matchdays: Array.from({ length: 38 }, (_, i) => i + 1),
//     matches: generateMatches("laliga", 'fase-inicial')
//   },
//   {
//     id: "copa-america",
//     name: "Copa América 2024",
//     shortName: "Copa América",
//     phases: [
//       { id: 'fase-de-grupos', name: 'Fase De Grupos' },
//       { id: 'cuartos', name: 'Cuartos De Final' },
//       { id: 'semifinales', name: 'Semifinales' },
//       { id: 'finales', name: 'Finales' },
//     ],
//     groups: [
//       { id: 'grupo-a', name: 'GRUPO A' },
//       { id: 'grupo-b', name: 'GRUPO B' },
//       { id: 'grupo-c', name: 'GRUPO C' },
//       { id: 'grupo-d', name: 'GRUPO D' },
//     ],
//     matchdays: Array.from({ length: 3 }, (_, i) => i + 1),
//     matches: generateMatches("copa-america", 'fase-de-grupos')
//   },
//   {
//     id: "premier-league",
//     name: "Premier League",
//     shortName: "Premier",
//     phases: [],
//     groups: [],
//     matchdays: Array.from({ length: 38 }, (_, i) => i + 1),
//     matches: generateMatches("premier-league", 'fase-inicial')
//   },
//   {
//     id: "serie-a-italy",
//     name: "Serie A Italia",
//     shortName: "Serie A",
//     phases: [],
//     groups: [],
//     matchdays: Array.from({ length: 38 }, (_, i) => i + 1),
//     matches: generateMatches("serie-a-italy", 'fase-inicial')
//   },
//   {
//     id: "bundesliga",
//     name: "Bundesliga",
//     shortName: "Bundesliga",
//     phases: [],
//     groups: [],
//     matchdays: Array.from({ length: 34 }, (_, i) => i + 1),
//     matches: generateMatches("bundesliga", 'fase-inicial')
//   },
//   {
//     id: "ligue-1",
//     name: "Ligue 1 Francia",
//     shortName: "Ligue 1",
//     phases: [],
//     groups: [],
//     matchdays: Array.from({ length: 34 }, (_, i) => i + 1),
//     matches: generateMatches("ligue-1", 'fase-inicial')
//   },
//   {
//     id: "olympics",
//     name: "Juegos Olímpicos",
//     shortName: "Olympics",
//     phases: [
//       { id: 'fase-de-grupos', name: 'Fase De Grupos' },
//       { id: 'cuartos', name: 'Cuartos De Final' },
//       { id: 'semifinales', name: 'Semifinales' },
//       { id: 'finales', name: 'Finales' },
//     ],
//     groups: [
//       { id: 'grupo-a', name: 'GRUPO A' },
//       { id: 'grupo-b', name: 'GRUPO B' },
//       { id: 'grupo-c', name: 'GRUPO C' },
//       { id: 'grupo-d', name: 'GRUPO D' },
//     ],
//     matchdays: Array.from({ length: 3 }, (_, i) => i + 1),
//     matches: generateMatches("olympics", 'fase-de-grupos')
//   }
// ];
