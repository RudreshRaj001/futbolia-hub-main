
import axios from 'axios';

// Create an API client with default config
const apiClient = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_FOOTBALL_API_KEY || '',
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
  }
});

// Leagues
export const getLeagues = async (country = 'Ecuador') => {
  try {
    const response = await apiClient.get('/leagues', { params: { country } });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    return [];
  }
};

// Teams
export const getTeams = async (league: number, season: number) => {
  try {
    const response = await apiClient.get('/teams', { 
      params: { league, season } 
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
};

// Fixtures
export const getFixtures = async (params: any) => {
  try {
    const response = await apiClient.get('/fixtures', { params });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return [];
  }
};

// Standings
export const getStandings = async (league: number, season: number) => {
  try {
    const response = await apiClient.get('/standings', { 
      params: { league, season } 
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching standings:', error);
    return [];
  }
};

// Players
export const getPlayers = async (team: number, season: number) => {
  try {
    const response = await apiClient.get('/players', { 
      params: { team, season } 
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};

// Top Scorers
export const getTopScorers = async (league: number, season: number) => {
  try {
    const response = await apiClient.get('/players/topscorers', { 
      params: { league, season } 
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching top scorers:', error);
    return [];
  }
};

// Live Matches
export const getLiveMatches = async () => {
  try {
    const response = await apiClient.get('/fixtures', { 
      params: { live: 'all' } 
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return [];
  }
};

// Team statistics
export const getTeamStatistics = async (league: number, season: number, team: number) => {
  try {
    const response = await apiClient.get('/teams/statistics', { 
      params: { league, season, team } 
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching team statistics:', error);
    return null;
  }
};

// Head to head
export const getHeadToHead = async (h2h: string) => {
  try {
    const response = await apiClient.get('/fixtures/headtohead', { 
      params: { h2h } 
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching head to head:', error);
    return [];
  }
};

// Search
export const searchTeams = async (search: string) => {
  try {
    const response = await apiClient.get('/teams', { 
      params: { search } 
    });
    return response.data.response;
  } catch (error) {
    console.error('Error searching teams:', error);
    return [];
  }
};

export default apiClient;
