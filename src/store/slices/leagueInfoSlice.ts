import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LeagueInfoState {
  leagueId: number | null;
  leagueName: string;
  season: number | null;
  teamId: number | null;
  teamName: string;
}

const initialState: LeagueInfoState = {
  leagueId: null,
  leagueName: '',
  season: null,
  teamId: null,
  teamName: '',
};

const leagueInfoSlice = createSlice({
  name: 'leagueInfo',
  initialState,
  reducers: {
    setLeagueInfo: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    updateTeam: (state, action: PayloadAction<{ teamId: number; teamName: string }>) => {
      state.teamId = action.payload.teamId;
      state.teamName = action.payload.teamName;
    },
    resetLeagueInfo: () => initialState,
  },
});

export const { setLeagueInfo, updateTeam, resetLeagueInfo } = leagueInfoSlice.actions;

export default leagueInfoSlice.reducer;
