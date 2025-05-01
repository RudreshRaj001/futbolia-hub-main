import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the structure of the transfer data
export interface Transfer {
  player: {
    id: number;
    name: string;
  };
  update: string;
  transfers: Array<{
    date: string;
    type: string;
    teams: {
      in: {
        id: number;
        name: string;
        logo: string;
      };
      out: {
        id: number;
        name: string;
        logo: string;
      };
    };
  }>;
}

// Define the state for the transfers slice
interface TransfersState {
  transfers: Transfer[];
  loading: boolean;
  error: string | null;
}

// Initial state for the slice
const initialState: TransfersState = {
  transfers: [],
  loading: false,
  error: null,
};

// Define an async thunk to fetch transfer data
export const fetchTransfers = createAsyncThunk(
  'transfers/fetchTransfers',
  async (team: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/transfers?team=${team}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const transfersSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransfers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransfers.fulfilled, (state, action) => {
        state.loading = false;
        state.transfers = action.payload;
      })
      .addCase(fetchTransfers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the actions (though we don't need any custom ones in this case)
export default transfersSlice.reducer;
