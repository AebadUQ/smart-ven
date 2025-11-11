import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { COMPLAINT } from "@/api/endpoint";
import api from "@/api/axios";

// ─── Types ─────────────────────────────────────

export type ComplaintStatus = "pending" | "acknowledge" | "closed";

export interface ComplaintType {
  _id: string;
  type?: string;
  issueType?: string;
  description?: string;
  image?: string;
  audio?: string;
  status: ComplaintStatus;
  reportType?: "parentReport" | "driverReport"; // if backend sends it
}

export interface ComplaintFilters {
  status?: ComplaintStatus | ""; // "" or undefined = all
  typeFilter?: "parentReport" | "driverReport" | ""; // "" or undefined = all
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

type GetAllComplaintsParams = {
  page?: number;
  limit?: number;
} & ComplaintFilters;

interface ComplaintState {
  complaints: ComplaintType[];
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta;
  filters: ComplaintFilters;
}

// ─── Initial State ─────────────────────────────

const initialState: ComplaintState = {
  complaints: [],
  loading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
  filters: {},
};

// ─── Thunks ─────────────────────────────────────

// Get all complaints with status + typeFilter
export const getAllComplaints = createAsyncThunk<
  { complaints: ComplaintType[]; pagination: PaginationMeta; filters: ComplaintFilters },
  GetAllComplaintsParams | undefined,
  { rejectValue: string }
>(
  "complaint/getAllComplaints",
  async (params = {}, { rejectWithValue }) => {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        typeFilter,
      } = params;

      const query: Record<string, any> = { page, limit };

      if (status) query.status = status;              // pending / acknowledge / closed
      if (typeFilter) query.typeFilter = typeFilter;  // parentReport / driverReport

      const response = await api.get(COMPLAINT.GET_ALL_COMPLAINT, {
        params: query,
      });

      // Expected: { message, data, pagination }
      const { data, pagination } = response.data as {
        data: ComplaintType[];
        pagination?: PaginationMeta;
      };

      return {
        complaints: data || [],
        pagination: pagination || {
          page,
          limit,
          total: data?.length || 0,
        },
        filters: {
          status: status || "",
          typeFilter: typeFilter || "",
        },
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch complaints"
      );
    }
  }
);

// Change complaint status
export const changeComplaintStatus = createAsyncThunk<
  { reportId: string; status: ComplaintStatus; updatedComplaint?: ComplaintType },
  { reportId: string; status: ComplaintStatus; feedback: string },
  { rejectValue: string }
>(
  "complaint/changeComplaintStatus",
  async ({ reportId, status, feedback }, { rejectWithValue }) => {
    try {
      const response = await api.post(COMPLAINT.CHANGE_STATUS, {
        reportId,
        status,
        feedback,
      });

      return {
        reportId,
        status,
        updatedComplaint: response.data?.data as ComplaintType | undefined,
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to change complaint status"
      );
    }
  }
);

// ─── Slice ──────────────────────────────────────

export const complaintSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all complaints
    builder.addCase(getAllComplaints.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      getAllComplaints.fulfilled,
      (
        state,
        action: PayloadAction<{
          complaints: ComplaintType[];
          pagination: PaginationMeta;
          filters: ComplaintFilters;
        }>
      ) => {
        state.loading = false;
        state.complaints = action.payload.complaints;
        state.pagination = action.payload.pagination;
        state.filters = action.payload.filters;
      }
    );

    builder.addCase(getAllComplaints.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch complaints";
    });

    // Change complaint status
    builder.addCase(changeComplaintStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      changeComplaintStatus.fulfilled,
      (
        state,
        action: PayloadAction<{
          reportId: string;
          status: ComplaintStatus;
          updatedComplaint?: ComplaintType;
        }>
      ) => {
        state.loading = false;
        const { reportId, status, updatedComplaint } = action.payload;

        const index = state.complaints.findIndex(
          (c) => c._id === reportId
        );

        if (index !== -1) {
          // minimal: update status
          state.complaints[index].status = status;

          // if backend returns full updated object, merge it
          if (updatedComplaint) {
            state.complaints[index] = {
              ...state.complaints[index],
              ...updatedComplaint,
            };
          }
        }
      }
    );

    builder.addCase(changeComplaintStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to change complaint status";
    });
  },
});

export default complaintSlice.reducer;
