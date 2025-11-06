import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/api/axios";
import { TRIP } from "@/api/endpoint";

// ─── State Interface ────────────────────────────────────────────────
interface TripState {
  trips: any[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total?: number;
  };
  statusFilter?: "start" | "ongoing" | "end" | ""; // current filter
}

// ─── Initial State ─────────────────────────────────────────────────
const initialState: TripState = {
  trips: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
  },
  statusFilter: "",
};

// ─── Thunks ────────────────────────────────────────────────────────

// ✅ Get All Trips
export const getAllTrips = createAsyncThunk<
  any, // response type
  { page?: number; limit?: number; status?: string }, // args
  { rejectValue: string }
>(
  "trip/getAllTrips",
  async ({ page = 1, limit = 10, status = "" } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get(TRIP.GET_ALL_TRIP, {
        params: { page, limit, status }, // 🔥 include status param
      });
      return response.data; // expected { message, data, pagination }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch trips"
      );
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────────
const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    clearTrips: (state) => {
      state.trips = [];
      state.error = null;
      state.loading = false;
    },
    setStatusFilter: (state, action: PayloadAction<"start" | "ongoing" | "end" | "">) => {
      state.statusFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Trips
      .addCase(getAllTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload?.data || [];
        if (action.payload?.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(getAllTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch trips";
      });
  },
});

// ─── Exports ──────────────────────────────────────────────────────
export const { clearTrips, setStatusFilter } = tripSlice.actions;
export default tripSlice.reducer;
