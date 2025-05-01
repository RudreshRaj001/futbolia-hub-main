
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient, handleApiError } from '../../services/apiConfig';
import { ApiResponse, TeamStatistics } from '../../types/api';

interface TeamStatsState {
  teamStats: TeamStatistics | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TeamStatsState = {
  teamStats: null,
  status: 'idle',
  error: null,
};

interface FetchTeamStatsParams {
  team: number;
  league: number;
  season: number;
}

export const fetchTeamStats = createAsyncThunk(
  'teamStats/fetchTeamStats',
  async ({ team, league, season }: FetchTeamStatsParams, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<ApiResponse<TeamStatistics>>('/teams/statistics', {
        params: { team, league, season }
      });
      return response.data.response;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const teamStatsSlice = createSlice({
  name: 'teamStats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamStats.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTeamStats.fulfilled, (state, action: PayloadAction<TeamStatistics>) => {
        state.status = 'succeeded';
        state.teamStats = action.payload;
      })
      .addCase(fetchTeamStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to fetch team statistics';
      });
  },
});

export default teamStatsSlice.reducer;
