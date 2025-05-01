// 1. standingsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface StandingTeam {
  rank: number;
  team: { id: number; name: string; logo: string };
  points: number;
  goalsDiff: number;
  form: string;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: { for: number; against: number };
  };
}

interface StandingLeague {
  league: {
    id: number;
    name: string;
    logo: string;
    season: number;
    country: string;
    flag: string;
    standings: StandingTeam[][];
  };
}

interface StandingsState {
  standings: StandingLeague[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StandingsState = {
  standings: [],
  status: "idle",
  error: null,
};

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchStandings = createAsyncThunk(
  "standings/fetchStandings",
  async ({ league, season }: { league: number; season: number }) => {
    const response = await axios.get(
      `${BASE_URL}/standings?league=${league}&season=${season}`
    );
    return response.data;
  }
);

const standingsSlice = createSlice({
  name: "standings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStandings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStandings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.standings = action.payload;
      })
      .addCase(fetchStandings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default standingsSlice.reducer;
