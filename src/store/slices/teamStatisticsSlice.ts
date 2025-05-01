import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface TeamStatistics {
  // Add your statistics type definitions here based on API response
  [key: string]: any;
}

interface TeamStatisticsState {
  data: TeamStatistics | null;
  loading: boolean;
  error: string | null;
}

const initialState: TeamStatisticsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchTeamStatistics = createAsyncThunk(
  "teamStatistics/fetchTeamStatistics",
  async ({
    teamId,
    season,
    leagueId,
  }: {
    teamId: number;
    season: number;
    leagueId: number;
  }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/teams/${teamId}/statistics?season=${season}&leagueId=${leagueId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const teamStatisticsSlice = createSlice({
  name: "teamStatistics",
  initialState,
  reducers: {
    clearTeamStatistics: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamStatistics.fulfilled, (state, action) => {
        state.loading = false;
        const { teamId } = action.meta.arg;
        if (!state.data) state.data = {};
        state.data[teamId] = action.payload;
        state.error = null;
      })
      .addCase(fetchTeamStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch team statistics";
      });
  },
});

export const { clearTeamStatistics } = teamStatisticsSlice.actions;
export default teamStatisticsSlice.reducer;
