// src/store/reducers/suadmin-slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import { SUADMIN } from "@/api/endpoint";

/* ── Thunks ─────────────────────────────────────────────────── */

// ✅ Register School
export const registerSchool = createAsyncThunk<any, any, { rejectValue: string }>(
  "superAdmin/registerSchool",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post(SUADMIN.REGISTER_SCHOOL, payload);
      return data;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Request failed";
      return rejectWithValue(msg);
    }
  }
);

// ✅ Get All Schools
export const getAllSchools = createAsyncThunk<
  { items: any[]; total: number; page: number; limit: number },
  { page?: number; limit?: number; search?: string; status?: string } | void,
  { rejectValue: string }
>("superAdmin/getAllSchools", async (params, { rejectWithValue }) => {
  try {
    const query = {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      search: params?.search ?? undefined,
      status: params?.status ?? undefined,
    };
    const { data } = await api.get(SUADMIN.GET_ALL_SCHOOL, { params: query });

    const root = data?.data ?? data;
    const items =
      root.items ??
      root.schools ??
      root.results ??
      root.list ??
      (Array.isArray(root) ? root : []);
    const total = root.total ?? root.count ?? items.length ?? 0;

    return {
      items,
      total,
      page: root.page ?? 1,
      limit: root.limit ?? 10,
    };
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Request failed";
    return rejectWithValue(msg);
  }
});

// ✅ Get School by ID
export const getSchoolById = createAsyncThunk<any, string | number, { rejectValue: string }>(
  "superAdmin/getSchoolById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${SUADMIN.SCHOOL_BY_ID}/${id}`);
      return data.data;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Request failed";
      return rejectWithValue(msg);
    }
  }
);

// ✅ Edit School
export const editSchool = createAsyncThunk<
  any,
  {
    schoolId: string;
    schoolInfo: {
      contactPerson?: string;
      startTime?: string;
      endTime?: string;
      maxTripDuration?: number;
      bufferTime?: number;
      currentPlan?: string;
      billingCycle?: string;
      paymentMethod?: string;
      allowedVans?: number;
      allowedStudents?: number;
      allowedRoutes?: number;
      autoRenew?: boolean;
      lat?: number;
      long?: number;
    };
  },
  { rejectValue: string }
>("superAdmin/editSchool", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post(SUADMIN.EDIT_SCHOOL, payload);
    return data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Request failed";
    return rejectWithValue(msg);
  }
});

/* ── Slice ──────────────────────────────────────────────────── */

type SuperAdminState = {
  loading: boolean;
  success: boolean;
  error: string | null;

  // Single School
  school: any | null;

  // All Schools
  schools: any[];
  total: number;
  page: number;
  limit: number;
  listLoading: boolean;
  listError: string | null;
};

const initialState: SuperAdminState = {
  loading: false,
  success: false,
  error: null,

  school: null,

  schools: [],
  total: 0,
  page: 1,
  limit: 10,
  listLoading: false,
  listError: null,
};

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState,
  reducers: {
    resetSuperAdminState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.school = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerSchool.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Request failed";
      })

      // Get All
      .addCase(getAllSchools.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(getAllSchools.fulfilled, (state, action) => {
        state.listLoading = false;
        state.schools = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(getAllSchools.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload ?? "Request failed";
      })

      // Get by ID
      .addCase(getSchoolById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchoolById.fulfilled, (state, action) => {
        state.loading = false;
        state.school = action.payload;
      })
      .addCase(getSchoolById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Request failed";
      })

      // Edit
      .addCase(editSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.school = action.payload;
      })
      .addCase(editSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Request failed";
      });
  },
});

export const { resetSuperAdminState } = superAdminSlice.actions;
export default superAdminSlice.reducer;
