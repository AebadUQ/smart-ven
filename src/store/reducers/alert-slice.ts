import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import { ALERT } from "@/api/endpoint";

const initialState: any = {
  alerts: [] as any[],
  alertDetail: null as any,
  pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
  loading: false,
  detailLoading: false,
  error: null,
  success: false,
};

// ─── Thunks ────────────────────────────────────────────────

// Get all alerts
export const getAllAlerts = createAsyncThunk(
  "alert/getAllAlerts",
  async ({ page = 1, limit = 10 }: any = {}, { rejectWithValue }) => {
    try {
      const response = await api.get(ALERT.GET_ALL_ALERTS, { params: { page, limit } });
      const { data, pagination } = response.data as any;
      return { alerts: data, pagination };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to fetch alerts");
    }
  }
);

// Get alert by ID
export const getAlertById = createAsyncThunk(
  "alert/getAlertById",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await api.get(`${ALERT.GET_ALERT_BY_ID}/${id}`);
      return response.data?.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to fetch alert detail");
    }
  }
);

// Add alert
export const addAlert = createAsyncThunk(
  "alert/addAlert",
  async (alertData: any, { rejectWithValue }) => {
    try {
      const response = await api.post(ALERT.ADD_ALERT, alertData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to add alert");
    }
  }
);

// Update alert
export const updateAlert = createAsyncThunk(
  "alert/updateAlert",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await api.post(ALERT.UPDATE_ALERT, data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to update alert");
    }
  }
);

// Delete alert
export const deleteAlert = createAsyncThunk(
  "alert/deleteAlert",
  async ({ alertId }: { alertId: any }, { rejectWithValue }) => {
    try {
      await api.post(ALERT.DELETE_ALERT, { alertId });
      return alertId; // return deleted alert ID
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to delete alert");
    }
  }
);

// ─── Slice ────────────────────────────────────────────────
const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    clearAlertStatus: (state: any) => {
      state.success = false;
      state.error = null;
    },
    clearAlertDetail: (state: any) => {
      state.alertDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all alerts
      .addCase(getAllAlerts.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAlerts.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.alerts = action.payload.alerts;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllAlerts.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch alerts";
      })

      // Get alert by ID
      .addCase(getAlertById.pending, (state: any) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(getAlertById.fulfilled, (state: any, action: any) => {
        state.detailLoading = false;
        state.alertDetail = action.payload;
      })
      .addCase(getAlertById.rejected, (state: any, action: any) => {
        state.detailLoading = false;
        state.error = action.payload || "Failed to fetch alert detail";
      })

      // Add alert
      .addCase(addAlert.pending, (state: any) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addAlert.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.success = true;
        state.alerts.unshift(action.payload);
      })
      .addCase(addAlert.rejected, (state: any, action: any) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to add alert";
      })

      // Update alert
      .addCase(updateAlert.pending, (state: any) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateAlert.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.success = true;
        const index = state.alerts.findIndex((a: any) => a._id === action.payload._id);
        if (index !== -1) state.alerts[index] = action.payload;
        if (state.alertDetail && state.alertDetail._id === action.payload._id) {
          state.alertDetail = action.payload;
        }
      })
      .addCase(updateAlert.rejected, (state: any, action: any) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to update alert";
      })

      // Delete alert
      .addCase(deleteAlert.pending, (state: any) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteAlert.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.success = true;
        // Remove deleted alert from list
        state.alerts = state.alerts.filter((a: any) => a._id !== action.payload);
      })
      .addCase(deleteAlert.rejected, (state: any, action: any) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to delete alert";
      });
  },
});

export const { clearAlertStatus, clearAlertDetail } = alertSlice.actions;
export default alertSlice.reducer;
