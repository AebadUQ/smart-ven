import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/api/axios";
import { DRIVER } from "@/api/endpoint";

const initialState: any = {
  drivers: [],
  pagination: null,
  loading: false,
  error: null,
  selectedDriver: null,
  selectedDriverLoading: false,
  selectedDriverError: null,
  assignDriverLoading: false,
  assignDriverError: null,
};

// ─── Thunks ────────────────────────────────────────────────────

// ✅ Get all drivers (with pagination)
export const getAllDrivers = createAsyncThunk<
  { drivers: any[]; pagination: any },
  { page?: number; limit?: number },
  { rejectValue: string }
>(
  "driver/getAllDrivers",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(DRIVER.GET_ALL_DRIVER_OF_SCHOOL, {
        params: { page, limit },
      });

      // Expected response format: { data: [], pagination: {} }
      const { data, pagination } = response.data;
      return { drivers: data, pagination };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch drivers"
      );
    }
  }
);

// ✅ Assign driver to van
export const assignDriverToVan = createAsyncThunk<
  { message: string },
  { driverId: string; vanId: string }
>(
  "driver/assignDriverToVan",
  async (body, { rejectWithValue }) => {
    try {
      const response = await api.post(DRIVER.ASSIGN_DRIVER_TO_VAN, body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to assign driver"
      );
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────
const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    clearDrivers: (state) => {
      state.drivers = [];
      state.pagination = null;
      state.loading = false;
      state.error = null;
    },
    clearSelectedDriver: (state) => {
      state.selectedDriver = null;
      state.selectedDriverLoading = false;
      state.selectedDriverError = null;
    },
  },
  extraReducers: (builder) => {
    // ✅ Get all drivers
    builder
      .addCase(getAllDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllDrivers.fulfilled,
        (state, action: PayloadAction<{ drivers: any[]; pagination: any }>) => {
          state.loading = false;
          state.drivers = action.payload.drivers;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(getAllDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch drivers";
      });

    // ✅ Assign driver to van
    builder
      .addCase(assignDriverToVan.pending, (state) => {
        state.assignDriverLoading = true;
        state.assignDriverError = null;
      })
      .addCase(assignDriverToVan.fulfilled, (state) => {
        state.assignDriverLoading = false;
      })
      .addCase(assignDriverToVan.rejected, (state, action) => {
        state.assignDriverLoading = false;
        state.assignDriverError =
          (action.payload as string) || "Failed to assign driver";
      });
  },
});

export const { clearDrivers, clearSelectedDriver } = driverSlice.actions;
export default driverSlice.reducer;
