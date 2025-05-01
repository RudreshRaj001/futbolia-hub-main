import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Team interface
export interface Team {
  id: number;
  name: string;
  logo: string;
  shortName: string;
  city: string;
  stadium: string;
  founded: number;
  league: string;
  // founded?: string;
  venue?: string;
  country?: string;
  currentLeagueId?: number;
}

// State Type
interface TeamState {
  teams: Team[];
  team: Team | null;
  loading: boolean;
  error: string | null;
}

// Define Standings Interface
export interface Standing {
  position: number;
  teamName: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
}

// State Type
interface TeamState {
  teams: Team[];
  team: Team | null;
  matches: any[]; // Assuming your match data is an array
  standings: Standing[];
  loading: boolean;
  error: string | null;
}

interface ApiResponse {
  team: Team;
  matches: any[];
  standings: Standing[];
}

// Initial State
const initialState: TeamState = {
  teams: [],
  team: null,
  matches: [],
  standings: [],
  loading: false,
  error: null,
};

// ✅ Fetch All Teams
export const fetchTeams = createAsyncThunk<Team[], { league: number; season: number }, { rejectValue: string }>(
  'teams/fetchTeams',
  async ({ league, season }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/teams?league=${league}&season=${season}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch teams');
    }
  }
);

// ✅ Fetch Single Team By ID
export const fetchTeamById = createAsyncThunk<ApiResponse, number, { rejectValue: string }>(
  'teams/fetchTeamById',
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/teams/${teamId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch team data');
    }
  }
);

// Team Slice
const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    clearTeamState(state) {
      state.team = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Teams
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
      });

    // Fetch Single Team
    builder
      .addCase(fetchTeamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamById.fulfilled, (state, action) => {
        state.loading = false;
        state.team = { ...action.payload.team };
        state.matches = [...action.payload.matches];
        state.standings = [...action.payload.standings];
      })
      .addCase(fetchTeamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error occurred';
      });
  },
});

// Export Actions and Reducer
export const { clearTeamState } = teamSlice.actions;
export default teamSlice.reducer;
