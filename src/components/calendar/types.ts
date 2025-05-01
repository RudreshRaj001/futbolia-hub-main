
export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  homeLogo: string;
  awayLogo: string;
  date: Date;
  competition: string;
  status: "UPCOMING" | "LIVE" | "FINALIZADO" | string;
  time: string;
}

export type MatchStatusFilter = "ALL" | "UPCOMING" | "LIVE" | "FINALIZADO";
