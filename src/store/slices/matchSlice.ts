// matchSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the shape of the match state.
interface MatchState {
  match: any;      // You can define a more specific type if desired.
  loading: boolean;
  error: string | null;
}

// Initial state for the match slice.
const initialState: MatchState = {
  match: null,
  loading: false,
  error: null,
};

// Asynchronous thunk to fetch the match details by ID.
export const fetchMatch = createAsyncThunk(
  'match/fetchMatch',
  async (matchId: string, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/match/${matchId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create the slice.
const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMatch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMatch.fulfilled, (state, action) => {
      state.loading = false;
      state.match = action.payload;
    });
    builder.addCase(fetchMatch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export default matchSlice.reducer;
