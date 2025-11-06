import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/api/axios";
import { DASHBOARD } from "@/api/endpoint";

interface DashboardState {
  stats: any | null;
  loading: boolean;
  error: string | null;
  filterType: string; // e.g. 'yearly', 'monthly', etc.
}

const initialState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
  filterType: "yearly",
};

// ─── Thunks ────────────────────────────────────────────────────

// ✅ Get Dashboard Stats
export const getDashboardStats = createAsyncThunk<
  any,
  { filterType?: string },
  { rejectValue: string }
>("dashboard/getDashboardStats", async ({ filterType = "yearly" }, { rejectWithValue }) => {
  try {
    const response = await api.get(DASHBOARD.GET_DASHBOARD_STATS, {
      params: { filterType },
    });
    console.log("response",response)
    return response.data.data || response.data; // adjust if your backend wraps in {data: ...}
  } catch (error: any) {
    console.log("errorerrorerror",error)
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch dashboard stats"
    );
  }
});

// ─── Slice ─────────────────────────────────────────────────────

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setFilterType: (state, action: PayloadAction<string>) => {
      state.filterType = action.payload;
    },
    clearDashboardStats: (state) => {
      state.stats = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Get dashboard stats
      .addCase(getDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch stats";
      });
  },
});

export const { setFilterType, clearDashboardStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;
