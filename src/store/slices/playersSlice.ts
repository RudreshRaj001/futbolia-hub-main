import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PlayerInfo } from '@/components/tournaments/types';

interface PlayersState {
  players: PlayerInfo[];
  selectedPlayer: PlayerInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlayersState = {
  players: [],
  selectedPlayer: null,
  loading: false,
  error: null,
};

const mapPosition = (apiPosition: string): string => {
  const positionMap: { [key: string]: string } = {
    'Goalkeeper': 'GK',
    'Defender': 'DF',
    'Midfielder': 'MF',
    'Forward': 'FW',
    'Attacker': 'FW',
    'Arquero': 'GK',
    'Portero': 'GK',
    'Defensor': 'DF',
    'Defensa': 'DF',
    'Volante': 'MF',
    'Mediocampista': 'MF',
    'Delantero': 'FW',
    'Atacante': 'FW'
  };
  return positionMap[apiPosition] || apiPosition;
};

export const fetchPlayersByTeam = createAsyncThunk(
  'players/fetchPlayersByTeam',
  async (teamId: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/players/${teamId}`);
      const apiPlayers = await response.json();
      const playersArray = Array.isArray(apiPlayers) ? apiPlayers : [apiPlayers];

      const formattedPlayers: PlayerInfo[] = playersArray.map(player => ({
        id: player.id,
        name: player.name,
        position: mapPosition(player.position),
        birthdate: player.birthdate,
        age: player.age,
        nationality: player.nationality,
        height: player.height,
        weight: player.weight
      }));

      return formattedPlayers;
    } catch (error) {
      throw new Error('Failed to fetch players');
    }
  }
);

export const fetchPlayerById = createAsyncThunk(
  'players/fetchPlayerById',
  async (playerId: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/players/details/${playerId}`);
      const player = await response.json();

      

      return player;
    } catch (error) {
      throw new Error('Failed to fetch player details');
    }
  }
);

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayersByTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayersByTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(fetchPlayersByTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch players';
      })
      .addCase(fetchPlayerById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedPlayer = null;
      })
      .addCase(fetchPlayerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPlayer = action.payload;
      })
      .addCase(fetchPlayerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch player details';
      });
  },
});

export default playersSlice.reducer;
