import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient, handleApiError } from '../../services/apiConfig';
import { ApiResponse, Fixture } from '../../types/api';

interface FixturesState {
  fixtures: Fixture[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FixturesState = {
  fixtures: [],
  status: 'idle',
  error: null,
};

// ✅ Accept optional status
export const fetchFixtures = createAsyncThunk(
  'fixtures/fetchFixtures',
  async (
    { league, season, status }: { league?: number; season: number; status?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.get<any>('/fixtures', {
        params: { league, season, status } // ✅ Send status param to backend
      });
      console.log("response data of fetch fixures:",response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const fixturesSlice = createSlice({
  name: 'fixtures',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFixtures.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFixtures.fulfilled, (state, action: PayloadAction<Fixture[]>) => {
        state.status = 'succeeded';
        state.fixtures = action.payload;
      })
      .addCase(fetchFixtures.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to fetch fixtures';
      });
  },
});

export default fixturesSlice.reducer;
