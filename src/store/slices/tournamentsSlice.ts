import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Tournament } from "@/components/tournaments/types";
import { mainNavigation, MenuItem, SubMenuItem } from "@/data/navigationData";
import {
  updateTournamentRoutes,
  tournamentRoutes,
} from "@/utils/tournamentRoutes";

// API response interfaces
export interface ApiTournament {
  id:        number;
  name:      string;
  country:   string;
  logo:      string;
  season:    string;
  startDate: string;
  endDate:   string;
}

export interface ApiStanding {
  position:       number;
  teamId:         number;
  teamName:       string;
  teamLogo:       string;
  played:         number;
  won:            number;
  drawn:          number;
  lost:           number;
  goalsFor:       number;
  goalsAgainst:   number;
  goalDifference: number;
  points:         number;
  form:           string;
  group:          string;
}

export interface ApiTopScorer {
  player: {
    id:        number;
    name:      string;
    firstname: string;
    lastname:  string;
    age:       number;
    birth: {
      date:    string;
      place:   string;
      country: string;
    };
    nationality: string;
    height:      string;
    weight:      string;
    injured:     boolean;
    photo:       string;
  };
  statistics: Array<{
    team: {
      id:   number;
      name: string;
      logo: string;
    };
    league: {
      id:       number;
      name:     string;
      country:  string;
      logo:     string;
      flag:     string;
      season:   number;
    };
    games: {
      appearences: number;
      lineups:     number;
      minutes:     number;
      number:      number | null;
      position:    string;
      rating:      string;
      captain:     boolean;
    };
    substitutes: {
      in:    number;
      out:   number;
      bench: number;
    };
    shots: {
      total: number;
      on:    number;
    };
    goals: {
      total:    number;
      conceded: number;
      assists:  number;
      saves:    number | null;
    };
    passes: {
      total:    number;
      key:      number;
      accuracy: number | null;
    };
    tackles: {
      total:         number;
      blocks:        number | null;
      interceptions: number;
    };
    duels: {
      total: number;
      won:   number;
    };
    dribbles: {
      attempts: number;
      success:  number;
      past:     number | null;
    };
    fouls: {
      drawn:     number;
      committed: number;
    };
    cards: {
      yellow:    number;
      yellowred: number;
      red:       number;
    };
    penalty: {
      won:      number | null;
      commited: number | null;
      scored:   number;
      missed:   number;
      saved:    number | null;
    };
  }>;
}

export interface ApiMatch {
  id:        number;
  date:      string;
  status:    string;
  matchday:  string;
  homeTeam: {
    id:    number;
    name:  string;
    logo:  string;
    score: number;
  };
  awayTeam: {
    id:    number;
    name:  string;
    logo:  string;
    score: number;
  };
  venue: string;
}

// State interface
export interface TournamentsState {
  tournaments:        ApiTournament[];
  standings:          ApiStanding[];
  topScorers:         ApiTopScorer[];
  matches:            ApiMatch[];
  combinedTournaments: Tournament[];
  navigationItems:     MenuItem[];
  loading:             boolean;
  error:               string | null;
}

const initialState: TournamentsState = {
  tournaments:         [],
  standings:           [],
  topScorers:          [],
  matches:             [],
  combinedTournaments: [],
  navigationItems:     [...mainNavigation],
  loading:             false,
  error:               null,
};

// Thunks

// 1) Fetch all tournaments
export const fetchTournaments = createAsyncThunk<ApiTournament[]>(
  "tournaments/fetchTournaments",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<ApiTournament[]>(
        `${import.meta.env.VITE_API_URL}/tournaments`
      );
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

// 2) Fetch standings — now accepts both tournamentId and season
export const fetchTournamentStandings = createAsyncThunk<
  ApiStanding[],
  { tournamentId: string; season: number }
>(
  "tournaments/fetchTournamentStandings",
  async ({ tournamentId, season }, { rejectWithValue }) => {
    try {
      if (!/^\d+$/.test(tournamentId)) {
        return rejectWithValue("Invalid tournament ID format");
      }
      const res = await axios.get<ApiStanding[]>(
        `${import.meta.env.VITE_API_URL}/tournaments/${tournamentId}/standings?season=${season}`
      );
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

// 3) Fetch top scorers — accepts tournamentId and season
export const fetchTopScorers = createAsyncThunk<
  ApiTopScorer[],
  { tournamentId: string; season: number }
>(
  "tournaments/fetchTopScorers",
  async ({ tournamentId, season }, { rejectWithValue }) => {
    try {
      const res = await axios.get<ApiTopScorer[]>(
        `${import.meta.env.VITE_API_URL}/tournaments/${tournamentId}/topscorers?season=${season}`
      );
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

// 4) Fetch matches by matchday — accepts tournamentId, matchday, and season
export const fetchMatchesByMatchday = createAsyncThunk<
  ApiMatch[],
  { tournamentId: string; matchday: number; season: number }
>(
  "tournaments/fetchMatchesByMatchday",
  async ({ tournamentId, matchday, season }, { rejectWithValue }) => {
    try {
      const res = await axios.get<ApiMatch[]>(
        `${import.meta.env.VITE_API_URL}/tournaments/${tournamentId}/matches/${matchday}?season=${season}`
      );
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

// Utils

const generateCombinedTournaments = (
  apiTournaments: ApiTournament[]
): Tournament[] => {
  updateTournamentRoutes(apiTournaments);
  return apiTournaments.map((api) => ({
    id:        api.id.toString(),
    name:      api.name,
    shortName: api.name,
    country:   api.country,
    season:    +api.season,
    logo:      api.logo,
    startDate: api.startDate,
    endDate:   api.endDate,
    phases:    [],
    groups:    [],
    matchdays: [],
    matches:   [],
  }));
};

const generateUpdatedNavigation = (
  apiTournaments: ApiTournament[]
): MenuItem[] => {
  const updatedNavigation = mainNavigation.map((item) => ({ ...item }));
  const index = updatedNavigation.findIndex((i) => i.path === "/torneos");

  if (index !== -1) {
    const submenu: SubMenuItem[] = [
      ...(updatedNavigation[index].submenu || []),
    ];

    const newItems: SubMenuItem[] = apiTournaments
      .filter((api) => {
        const routeExists = !!tournamentRoutes[api.id.toString()];
        const alreadyExists = submenu.some((s) =>
          s.path.endsWith(`/${tournamentRoutes[api.id.toString()]}`)
        );
        return routeExists && !alreadyExists;
      })
      .map((api) => ({
        name: api.name,
        path: `/torneos/${tournamentRoutes[api.id.toString()]}`,
      }));

    if (newItems.length > 0) {
      updatedNavigation[index] = {
        ...updatedNavigation[index],
        submenu: [...submenu, ...newItems],
      };
    }
  } else {
    console.warn("No '/torneos' route found in navigation config.");
  }

  return updatedNavigation;
};

// Slice

const tournamentsSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTournaments
      .addCase(fetchTournaments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTournaments.fulfilled,
        (state, action: PayloadAction<ApiTournament[]>) => {
          state.tournaments = action.payload;
          state.combinedTournaments = generateCombinedTournaments(
            action.payload
          );
          state.navigationItems = generateUpdatedNavigation(action.payload);
          state.loading = false;
        }
      )
      .addCase(fetchTournaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchTournamentStandings
      .addCase(fetchTournamentStandings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTournamentStandings.fulfilled,
        (state, action: PayloadAction<ApiStanding[]>) => {
          state.standings = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTournamentStandings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchTopScorers
      .addCase(fetchTopScorers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTopScorers.fulfilled,
        (state, action: PayloadAction<ApiTopScorer[]>) => {
          state.topScorers = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTopScorers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchMatchesByMatchday
      .addCase(fetchMatchesByMatchday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMatchesByMatchday.fulfilled,
        (state, action: PayloadAction<ApiMatch[]>) => {
          state.matches = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchMatchesByMatchday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const tournamentsReducer = tournamentsSlice.reducer;
