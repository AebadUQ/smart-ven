import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/api/axios";
import { ALERT } from "@/api/endpoint";

// ─── Types ─────────────────────────────────────────────────────
export interface Alert {
  _id?: string;
  alertType: string;
  recipientType: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

interface AlertState {
  alerts: Alert[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AlertState = {
  alerts: [],
  loading: false,
  error: null,
  success: false,
};

// ─── Thunks ────────────────────────────────────────────────────

// Get all alerts
export const getAllAlerts = createAsyncThunk<Alert[]>(
  "alert/getAllAlerts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(ALERT.GET_ALL_ALERTS);
      return response.data.data as Alert[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch alerts");
    }
  }
);

// Add new alert
export const addAlert = createAsyncThunk<Alert, Partial<Alert>>(
  "alert/addAlert",
  async (alertData, { rejectWithValue }) => {
    try {
      const response = await api.post(ALERT.ADD_ALERT, alertData);
      return response.data.data as Alert;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add alert");
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────
const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    clearAlerts: (state) => {
      state.alerts = [];
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearAlertStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all alerts
      .addCase(getAllAlerts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAlerts.fulfilled, (state, action: PayloadAction<Alert[]>) => {
        state.loading = false;
        state.alerts = action.payload;
      })
      .addCase(getAllAlerts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch alerts";
      })

      // Add new alert
      .addCase(addAlert.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addAlert.fulfilled, (state, action: PayloadAction<Alert>) => {
        state.loading = false;
        state.success = true;
        state.alerts.unshift(action.payload); // add new alert on top
      })
      .addCase(addAlert.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) || "Failed to add alert";
      });
  },
});

export const { clearAlerts, clearAlertStatus } = alertSlice.actions;
export default alertSlice.reducer;
