
import { MatchCardProps } from './MatchCard';

export const mockMatches: MatchCardProps[] = [
  {
    homeTeam: { 
      name: "Barcelona SC", 
      code: "BSC", 
      score: 1,
      logo: "/lovable-uploads/b91191e9-17d1-4b52-8006-dc951c4797bb.png"
    },
    awayTeam: { 
      name: "Emelec", 
      code: "CSE", 
      score: 3,
      logo: "/lovable-uploads/e2f19ce6-8133-436e-aa51-86597e66cff6.png"
    },
    isFinished: true,
    tournament: "Liga Pro Serie A"
  },
  {
    homeTeam: { 
      name: "Aucas", 
      code: "AUC", 
      score: 0,
      logo: "/lovable-uploads/a4d00396-5f83-48a4-99ad-9bfcabe9bc91.png"
    },
    awayTeam: { 
      name: "Liga de Quito", 
      code: "LDU", 
      score: 2,
      logo: "/lovable-uploads/f98ce377-afbb-4ccf-95ba-aefeafdc0448.png"
    },
    isFinished: true,
    tournament: "Liga Pro Serie A"
  },
  {
    homeTeam: { 
      name: "Independiente del Valle", 
      code: "IDV", 
      score: 2,
      logo: "/lovable-uploads/dd32855b-5fb2-489b-b817-706758675c13.png"
    },
    awayTeam: { 
      name: "Universidad Católica", 
      code: "UCE", 
      score: 1,
      logo: "/lovable-uploads/9380800f-fac9-48f8-b561-8a527fa162f6.png"
    },
    matchTime: "21:03",
    isFinished: true,
    tournament: "Copa Libertadores"
  },
  {
    homeTeam: { 
      name: "Delfín SC", 
      code: "DEL", 
      score: 2,
      logo: "/lovable-uploads/f97640bf-5b9b-4169-bf2a-ab1d2de70153.png"
    },
    awayTeam: { 
      name: "Mushuc Runa", 
      code: "MUS", 
      score: 1,
      logo: "/lovable-uploads/be584fe6-57fc-4ed8-b76c-ee8fbde105ae.png"
    },
    matchTime: "21:03",
    isFinished: true,
    tournament: "Liga Pro Serie A"
  },
  {
    homeTeam: { 
      name: "Ecuador", 
      code: "ECU",
      logo: "/lovable-uploads/52ae264f-4f5f-4b4d-9ef2-2641e248fa62.png"
    },
    awayTeam: { 
      name: "Bolivia", 
      code: "BOL",
      logo: "/lovable-uploads/78cf2665-84ff-412d-bd58-148ece62fde8.png"
    },
    matchTime: "19:00",
    tournament: "Eliminatorias Mundial 2026"
  },
  {
    homeTeam: { 
      name: "Técnico Universitario", 
      code: "TEC",
      logo: "/lovable-uploads/c97bb1df-4ee1-42d8-a996-1065af639933.png"
    },
    awayTeam: { 
      name: "Orense SC", 
      code: "ORE",
      logo: "/lovable-uploads/d76e195a-36bb-482a-b711-ff397fba1095.png"
    },
    matchTime: "15:00",
    tournament: "Liga Pro Serie A 2024-2025"
  }
];
