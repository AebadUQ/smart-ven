import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/api/axios";
import { VAN, STUDENT } from "@/api/endpoint";

// ─── Types ─────────────────────────────────────────────────────
export interface Van {
  _id: string;
  driverId: string;
  driverName?: string;
  driverEmail?: string;
  driverPhone?: string;
  driverCnic?: string;
  driverLicense?: string;
  schoolId: string;
  venImage?: string;
  cnic?: string;
  vehicleType: string;
  venCapacity: number;
  assignRoute: string;
  startTime?: string;
  endTime?: string;
  licenceImageFront?: string;
  licenceImageBack?: string;
  carNumber: string;
  vehicleCardImage?: string;
  status: string;
  condition?: string;
  deviceId?: string;
  createdAt: string;
  updatedAt: string;
  trips?: any[];
  [key: string]: any;
}

interface VanState {
  vans: Van[];
  selectedVan?: Van | null;
  loading: boolean;
  error: string | null;
  assignLoading: boolean;
  assignSuccess: boolean;
  assignError: string | null;
  selectedVanLoading: boolean;
  selectedVanError: string | null;
  addVanLoading: boolean;
  addVanSuccess: boolean;
  addVanError: string | null;
  updateVanLoading: boolean;
  updateVanError: string | null;
}

const initialState: VanState = {
  vans: [],
  selectedVan: null,
  loading: false,
  error: null,
  assignLoading: false,
  assignSuccess: false,
  assignError: null,
  selectedVanLoading: false,
  selectedVanError: null,
  addVanLoading: false,
  addVanSuccess: false,
  addVanError: null,
  updateVanLoading: false,
  updateVanError: null,
};

// ─── Thunks ────────────────────────────────────────────────────

// Get all vans
export const getAllSchoolVans = createAsyncThunk<Van[]>(
  "van/getAllSchoolVans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(VAN.GET_ALL_VAN_OF_SCHOOL);
      return response.data.data as Van[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch vans");
    }
  }
);

// Assign van to student
interface AssignVanPayload {
  kidId: string;
  vanId: string;
}
export const assignVanToStudent = createAsyncThunk<any, AssignVanPayload, { rejectValue: string }>(
  "van/assignVanToStudent",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(STUDENT.ASSIGN_VAN, payload);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to assign van");
    }
  }
);

// Get van detail by ID
export const getVanDetailById = createAsyncThunk<Van, string, { rejectValue: string }>(
  "van/getVanDetailById",
  async (vanId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${VAN.GET_VAN_BY_ID}/${vanId}`);
      return response.data.data as Van;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch van detail");
    }
  }
);

// Add new van
export const addVan = createAsyncThunk<Van, Partial<Van>, { rejectValue: string }>(
  "van/addVan",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(VAN.ADD_VAN, payload);
      return response.data.data as Van;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add van");
    }
  }
);

// ─── Update van ────────────────────────────────────────────────
interface UpdateVanPayload {
  vanId: string;
  [key: string]: any;
}

export const updateVan = createAsyncThunk<Van>(
  "van/updateVan",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(`${VAN.UPDATE_VAN}`, payload);
      return response.data.data as Van;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update van");
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────
const vanSlice = createSlice({
  name: "van",
  initialState,
  reducers: {
    clearVans: (state) => {
      state.vans = [];
      state.loading = false;
      state.error = null;
    },
    resetAssignVan: (state) => {
      state.assignLoading = false;
      state.assignSuccess = false;
      state.assignError = null;
    },
    clearSelectedVan: (state) => {
      state.selectedVan = null;
      state.selectedVanLoading = false;
      state.selectedVanError = null;
    },
    resetAddVan: (state) => {
      state.addVanLoading = false;
      state.addVanSuccess = false;
      state.addVanError = null;
    },
    resetUpdateVan: (state) => {
      state.updateVanLoading = false;
      state.updateVanError = null;
    },
  },
  extraReducers: (builder) => {
    // ─── Get all vans ───
    builder
      .addCase(getAllSchoolVans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSchoolVans.fulfilled, (state, action: PayloadAction<Van[]>) => {
        state.loading = false;
        state.vans = action.payload;
      })
      .addCase(getAllSchoolVans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch vans";
      });

    // ─── Assign van ───
    builder
      .addCase(assignVanToStudent.pending, (state) => {
        state.assignLoading = true;
        state.assignSuccess = false;
        state.assignError = null;
      })
      .addCase(assignVanToStudent.fulfilled, (state) => {
        state.assignLoading = false;
        state.assignSuccess = true;
      })
      .addCase(assignVanToStudent.rejected, (state, action) => {
        state.assignLoading = false;
        state.assignSuccess = false;
        state.assignError = action.payload || "Failed to assign van";
      });

    // ─── Get van detail ───
    builder
      .addCase(getVanDetailById.pending, (state) => {
        state.selectedVanLoading = true;
        state.selectedVanError = null;
        state.selectedVan = null;
      })
      .addCase(getVanDetailById.fulfilled, (state, action: PayloadAction<Van>) => {
        state.selectedVanLoading = false;
        state.selectedVan = action.payload;
      })
      .addCase(getVanDetailById.rejected, (state, action) => {
        state.selectedVanLoading = false;
        state.selectedVanError = action.payload || "Failed to fetch van detail";
      });

    // ─── Add van ───
    builder
      .addCase(addVan.pending, (state) => {
        state.addVanLoading = true;
        state.addVanSuccess = false;
        state.addVanError = null;
      })
      .addCase(addVan.fulfilled, (state, action: PayloadAction<Van>) => {
        state.addVanLoading = false;
        state.addVanSuccess = true;
        state.vans.push(action.payload);
      })
      .addCase(addVan.rejected, (state, action) => {
        state.addVanLoading = false;
        state.addVanSuccess = false;
        state.addVanError = action.payload || "Failed to add van";
      });

    // ─── Update van ───
    builder
      .addCase(updateVan.pending, (state) => {
        state.updateVanLoading = true;
        state.updateVanError = null;
      })
      .addCase(updateVan.fulfilled, (state, action: PayloadAction<Van>) => {
        state.updateVanLoading = false;
        state.selectedVan = action.payload;

        // Update in vans array if exists
        const index = state.vans.findIndex(v => v._id === action.payload._id);
        if (index !== -1) state.vans[index] = action.payload;
      })
      .addCase(updateVan.rejected, (state, action) => {
        state.updateVanLoading = false;
        // state.updateVanError = action.payload || "Failed to update van";
      });
  },
});

export const { clearVans, resetAssignVan, clearSelectedVan, resetAddVan, resetUpdateVan } = vanSlice.actions;
export default vanSlice.reducer;
