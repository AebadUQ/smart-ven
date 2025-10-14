import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"; 
import api from "@/api/axios";
import { DRIVER } from "@/api/endpoint";

// ─── Types ─────────────────────────────────────────────────────
export interface Driver {
  _id: string;
  schoolId: string;
  fullname: string;
  email?: string;
  phoneNo?: string;
  alternatePhoneNo?: string;
  NIC?: string;
  address?: string;
  image?: string;
  avatar?: string;
  isVerified: boolean;
  isDelete?: boolean;
  licenceImageFront?: string;
  licenceImageBack?: string;
  vehicleCardImageFront?: string;
  vehicleCardImageBack?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

interface DriverState {
  drivers: Driver[];
  loading: boolean;
  error: string | null;
  selectedDriver?: Driver | null;
  selectedDriverLoading: boolean;
  selectedDriverError: string | null;
  assignDriverLoading: boolean;
  assignDriverError: string | null;
}

const initialState: DriverState = {
  drivers: [],
  loading: false,
  error: null,
  selectedDriver: null,
  selectedDriverLoading: false,
  selectedDriverError: null,
  assignDriverLoading: false,
  assignDriverError: null,
};

// ─── Thunks ────────────────────────────────────────────────────

// Get all drivers
export const getAllDrivers = createAsyncThunk<Driver[]>(
  "driver/getAllDrivers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(DRIVER.GET_ALL_DRIVER_OF_SCHOOL);
      return response.data.data as Driver[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch drivers");
    }
  }
);

// Assign driver to van
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
      return rejectWithValue(error.response?.data?.message || "Failed to assign driver");
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
    // Get all drivers
    builder
      .addCase(getAllDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDrivers.fulfilled, (state, action: PayloadAction<Driver[]>) => {
        state.loading = false;
        state.drivers = action.payload;
      })
      .addCase(getAllDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch drivers";
      });

    // Assign driver to van
    builder
      .addCase(assignDriverToVan.pending, (state) => {
        state.assignDriverLoading = true;
        state.assignDriverError = null;
      })
      .addCase(assignDriverToVan.fulfilled, (state, action) => {
        state.assignDriverLoading = false;
      })
      .addCase(assignDriverToVan.rejected, (state, action) => {
        state.assignDriverLoading = false;
        state.assignDriverError = action.payload as string || "Failed to assign driver";
      });
  },
});

export const { clearDrivers, clearSelectedDriver } = driverSlice.actions;
export default driverSlice.reducer;
