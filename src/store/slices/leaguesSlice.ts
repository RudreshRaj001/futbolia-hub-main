import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient, handleApiError } from '../../services/apiConfig';
import { ApiResponse, LeagueDetail } from '../../types/api';
import axios from 'axios';

export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  score?: string;
  date: string;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
  competition?: string;
  venue?: string;
}

export interface Standing {
  position: number;
  team: {
    id: number;
    name: string;
    logo?: string;
  };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

interface LeaguesState {
  leagues: LeagueDetail[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  matches: Match[];
  standings: Standing[];
  loading: boolean;
}

const initialState: LeaguesState = {
  leagues: [],
  status: 'idle',
  error: null,
  matches: [],
  standings: [],
  loading: false,
};

export const fetchLeagues = createAsyncThunk(
  'leagues/fetchLeagues',
  async (country: string = 'Ecuador', { rejectWithValue }) => {
    try {
      const response = await apiClient.get<ApiResponse<LeagueDetail[]>>('/leagues', {
        params: { country }
      });
      return response.data.response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const leaguesSlice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeagues.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLeagues.fulfilled, (state, action: PayloadAction<LeagueDetail[]>) => {
        state.status = 'succeeded';
        state.leagues = action.payload;
      })
      .addCase(fetchLeagues.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to fetch leagues';
      });
  },
});

export default leaguesSlice.reducer;
