import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { COMPLAINT } from "@/api/endpoint";
import api from "@/api/axios";

export const getAllComplaints = createAsyncThunk(
  "complaint/getAllComplaints",
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get(COMPLAINT.GET_ALL_COMPLAINT, { params: { page, limit } });
      return response.data; // data includes: { message, data, pagination }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch complaints");
    }
  }
);

interface ComplaintState {
  complaints: any[];
  loading: boolean;
  error: string | null;
  pagination: { page: number; limit: number; total: number };
}

const initialState: ComplaintState = {
  complaints: [],
  loading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
};

export const complaintSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.data; // <-- use `data` from API
        state.pagination = {
          page: action.payload.pagination?.page || 1,
          limit: action.payload.pagination?.limit || 10,
          total: action.payload.pagination?.total || action.payload.data.length || 0,
        };
      })
      .addCase(getAllComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default complaintSlice.reducer;
