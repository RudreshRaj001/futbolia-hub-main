
import { useQuery } from '@tanstack/react-query';
import * as api from '@/services/api';

// Hook for fetching leagues
export const useLeagues = (country = 'Ecuador') => {
  return useQuery({
    queryKey: ['leagues', country],
    queryFn: () => api.getLeagues(country),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

// Hook for fetching teams
export const useTeams = (league: number, season: number) => {
  return useQuery({
    queryKey: ['teams', league, season],
    queryFn: () => api.getTeams(league, season),
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!league && !!season,
  });
};

// Hook for fetching fixtures
export const useFixtures = (params: any) => {
  return useQuery({
    queryKey: ['fixtures', params],
    queryFn: () => api.getFixtures(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!params,
  });
};

// Hook for fetching standings
export const useStandings = (league: number, season: number) => {
  return useQuery({
    queryKey: ['standings', league, season],
    queryFn: () => api.getStandings(league, season),
    staleTime: 1000 * 60 * 15, // 15 minutes
    enabled: !!league && !!season,
  });
};

// Hook for fetching players
export const usePlayers = (team: number, season: number) => {
  return useQuery({
    queryKey: ['players', team, season],
    queryFn: () => api.getPlayers(team, season),
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!team && !!season,
  });
};

// Hook for fetching top scorers
export const useTopScorers = (league: number, season: number) => {
  return useQuery({
    queryKey: ['topScorers', league, season],
    queryFn: () => api.getTopScorers(league, season),
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!league && !!season,
  });
};

// Hook for fetching live matches
export const useLiveMatches = () => {
  return useQuery({
    queryKey: ['liveMatches'],
    queryFn: api.getLiveMatches,
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 60, // Refetch every minute
  });
};

// Hook for fetching team statistics
export const useTeamStatistics = (league: number, season: number, team: number) => {
  return useQuery({
    queryKey: ['teamStatistics', league, season, team],
    queryFn: () => api.getTeamStatistics(league, season, team),
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!league && !!season && !!team,
  });
};

// Hook for fetching head to head
export const useHeadToHead = (team1: number, team2: number) => {
  return useQuery({
    queryKey: ['headToHead', team1, team2],
    queryFn: () => api.getHeadToHead(`${team1}-${team2}`),
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!team1 && !!team2,
  });
};
