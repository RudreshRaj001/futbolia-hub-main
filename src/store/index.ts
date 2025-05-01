import { configureStore } from '@reduxjs/toolkit';
import leaguesReducer from './slices/leaguesSlice';
import standingsReducer from './slices/standingsSlice';
import fixturesReducer from './slices/fixturesSlice';
import teamStatsReducer from './slices/teamStatsSlice';
import playersReducer from './slices/playersSlice';
import teamsReducer from './slices/teamSlice';
import teamStatisticsReducer from './slices/teamStatisticsSlice';
import { tournamentsReducer } from './slices/tournamentsSlice';
import newsReducer from './slices/newsSlice';
import matchReducer from './slices/matchSlice';
import transfersReducer from './slices/transfersSlice';
import leagueInfoReducer from './slices/leagueInfoSlice';

export const store = configureStore({
  reducer: {
    leagues: leaguesReducer,
    standings: standingsReducer,
    fixtures: fixturesReducer,
    teamStats: teamStatsReducer,
    players: playersReducer,
    teams: teamsReducer,
    teamStatistics: teamStatisticsReducer,
    tournaments: tournamentsReducer,
    news: newsReducer, 
    match: matchReducer,
    transfers: transfersReducer,
    leagueInfo: leagueInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
