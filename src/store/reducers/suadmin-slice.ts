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

// ✅ Create Billing / Invoice
export const createBilling = createAsyncThunk<
  any,
  {
    schoolId: string;
    billingCycle: "weekly" | "monthly" | "quarterly" | "yearly";
    planType: string;              // "Fixed Plan"
    startDate: string;             // "01-Nov-2025"
    paymentMethod: string;         // "Bank Transfer"
    amount: string;                // "1,250.00 USD"
    invoiceStatus: string;         // "Unpaid"
    notes?: string;
  },
  { rejectValue: string }
>("superAdmin/createBilling", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post(SUADMIN.CREATE_BILLING, payload);
    return data?.data ?? data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Request failed";
    return rejectWithValue(msg);
  }
});

/* ✅ NEW: Get All Invoices (like your route slice style) */
export const getAllInvoices = createAsyncThunk<
  { invoices: any[]; pagination: { total: number; page: number; limit: number } },
  { page?: number; limit?: number; status?: string; schoolId?: string; search?: string } | void,
  { rejectValue: string }
>("superAdmin/getAllInvoices", async (params, { rejectWithValue }) => {
  try {
    const query = {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      status: params?.status ?? undefined,
      schoolId: params?.schoolId ?? undefined,
      search: params?.search ?? undefined,
    };

    const { data } = await api.get(SUADMIN.GET_ALL_INVOICE, { params: query });

    // Normalize common server shapes
    const root = data?.data ?? data;
    const list =
      root.items ??
      root.invoices ??
      root.results ??
      root.list ??
      (Array.isArray(root) ? root : []);
    const total = root.total ?? root.count ?? list.length ?? 0;
    const page = root.page ?? query.page ?? 1;
    const limit = root.limit ?? query.limit ?? 10;

    return {
      invoices: list,
      pagination: { total, page, limit },
    };
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Failed to fetch invoices";
    return rejectWithValue(msg);
  }
});

// ✅ Create Banner
export const createBanner = createAsyncThunk<
  any,
  {
    banners: Array<{
      title: string;
      imageUrl: string;
      redirectUrl?: string;
      deepLink?: string;
      priority?: number;
      isActive?: boolean;
      startDate?: string;
      endDate?: string;
    }>;
  },
  { rejectValue: string }
>("superAdmin/createBanner", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post(SUADMIN.CREATE_BANNER, payload);
    return data?.data ?? data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Request failed";
    return rejectWithValue(msg);
  }
});

// ✅ Get All Banners
export const getAllBanners = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>("superAdmin/getAllBanners", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get(SUADMIN.GET_ALL_BANNERS);
    return Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Request failed";
    return rejectWithValue(msg);
  }
});

// ✅ Get Banner by ID
export const getBannerById = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("superAdmin/getBannerById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`${SUADMIN.GET_BANNER_BY_ID}/${id}`);
    return data?.data ?? data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Request failed";
    return rejectWithValue(msg);
  }
});

// ✅ Update Banner
export const updateBanner = createAsyncThunk<
  any,
  {
    id: string;
    banner: {
      title?: string;
      imageUrl?: string;
      redirectUrl?: string;
      deepLink?: string;
      priority?: number;
      isActive?: boolean;
      startDate?: string;
      endDate?: string;
    };
  },
  { rejectValue: string }
>("superAdmin/updateBanner", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`${SUADMIN.UPDATE_BANNER}/${payload.id}`, payload.banner);
    return data?.data ?? data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Request failed";
    return rejectWithValue(msg);
  }
});

// ✅ Delete Banner
export const deleteBanner = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("superAdmin/deleteBanner", async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.delete(`${SUADMIN.DELETE_BANNER}/${id}`);
    return data?.data ?? data;
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

  // Schools list
  schools: any[];
  total: number;
  page: number;
  limit: number;
  listLoading: boolean;
  listError: string | null;

  // Billing create
  billingCreateLoading: boolean;
  billingCreateSuccess: boolean;
  billingCreateError: string | null;
  lastCreatedInvoice: any | null;

  // ✅ Invoices list (route slice style)
  invoices: any[];
  invoicePagination: { total: number; page: number; limit: number };
  invoicesLoading: boolean;
  invoicesError: string | null;

  // Banner create
  bannerCreateLoading: boolean;
  bannerCreateSuccess: boolean;
  bannerCreateError: string | null;
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

  billingCreateLoading: false,
  billingCreateSuccess: false,
  billingCreateError: null,
  lastCreatedInvoice: null,

  // ✅ invoices
  invoices: [],
  invoicePagination: { total: 0, page: 1, limit: 10 },
  invoicesLoading: false,
  invoicesError: null,

  // Banner create
  bannerCreateLoading: false,
  bannerCreateSuccess: false,
  bannerCreateError: null,

  // Banners list
  banners: [],
  bannersLoading: false,
  bannersError: null,

  // Single banner
  banner: null,
  bannerLoading: false,
  bannerError: null,

  // Banner update
  bannerUpdateLoading: false,
  bannerUpdateSuccess: false,
  bannerUpdateError: null,

  // Banner delete
  bannerDeleteLoading: false,
  bannerDeleteSuccess: false,
  bannerDeleteError: null,
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

      state.billingCreateLoading = false;
      state.billingCreateSuccess = false;
      state.billingCreateError = null;
      state.lastCreatedInvoice = null;

      state.invoicesLoading = false;
      state.invoicesError = null;
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
        state.error = (action.payload as string) ?? "Request failed";
      })

      // Get All Schools
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
        state.listError = (action.payload as string) ?? "Request failed";
      })

      // Get School by ID
      .addCase(getSchoolById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchoolById.fulfilled, (state, action) => {
        state.loading = false;
        state.school = action.payload;
      })
      .addCase(getSchoolById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Request failed";
      })

      // Create Billing
      .addCase(createBilling.pending, (state) => {
        state.billingCreateLoading = true;
        state.billingCreateError = null;
        state.billingCreateSuccess = false;
      })
      .addCase(createBilling.fulfilled, (state, action) => {
        state.billingCreateLoading = false;
        state.billingCreateSuccess = true;
        state.lastCreatedInvoice = action.payload;
      })
      .addCase(createBilling.rejected, (state, action) => {
        state.billingCreateLoading = false;
        state.billingCreateSuccess = false;
        state.billingCreateError = (action.payload as string) ?? "Request failed";
      })

      // Edit School
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
        state.error = (action.payload as string) ?? "Request failed";
      })

      /* ✅ Invoices list */
      .addCase(getAllInvoices.pending, (state) => {
        state.invoicesLoading = true;
        state.invoicesError = null;
      })
      .addCase(getAllInvoices.fulfilled, (state, action) => {
        state.invoicesLoading = false;
        state.invoices = action.payload.invoices;
        state.invoicePagination = action.payload.pagination;
      })
      .addCase(getAllInvoices.rejected, (state, action) => {
        state.invoicesLoading = false;
        state.invoicesError = (action.payload as string) ?? "Failed to fetch invoices";
      })

      // Create Banner
      .addCase(createBanner.pending, (state) => {
        state.bannerCreateLoading = true;
        state.bannerCreateError = null;
        state.bannerCreateSuccess = false;
      })
      .addCase(createBanner.fulfilled, (state) => {
        state.bannerCreateLoading = false;
        state.bannerCreateSuccess = true;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.bannerCreateLoading = false;
        state.bannerCreateSuccess = false;
        state.bannerCreateError = (action.payload as string) ?? "Request failed";
      })

      // Get All Banners
      .addCase(getAllBanners.pending, (state) => {
        state.bannersLoading = true;
        state.bannersError = null;
      })
      .addCase(getAllBanners.fulfilled, (state, action) => {
        state.bannersLoading = false;
        state.banners = action.payload;
      })
      .addCase(getAllBanners.rejected, (state, action) => {
        state.bannersLoading = false;
        state.bannersError = (action.payload as string) ?? "Request failed";
      })

      // Get Banner by ID
      .addCase(getBannerById.pending, (state) => {
        state.bannerLoading = true;
        state.bannerError = null;
      })
      .addCase(getBannerById.fulfilled, (state, action) => {
        state.bannerLoading = false;
        state.banner = action.payload;
      })
      .addCase(getBannerById.rejected, (state, action) => {
        state.bannerLoading = false;
        state.bannerError = (action.payload as string) ?? "Request failed";
      })

      // Update Banner
      .addCase(updateBanner.pending, (state) => {
        state.bannerUpdateLoading = true;
        state.bannerUpdateError = null;
        state.bannerUpdateSuccess = false;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.bannerUpdateLoading = false;
        state.bannerUpdateSuccess = true;
        state.banner = action.payload;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.bannerUpdateLoading = false;
        state.bannerUpdateSuccess = false;
        state.bannerUpdateError = (action.payload as string) ?? "Request failed";
      })

      // Delete Banner
      .addCase(deleteBanner.pending, (state) => {
        state.bannerDeleteLoading = true;
        state.bannerDeleteError = null;
        state.bannerDeleteSuccess = false;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.bannerDeleteLoading = false;
        state.bannerDeleteSuccess = true;
        // Remove deleted banner from list
        state.banners = state.banners.filter((b: any) => (b._id ?? b.id) !== action.meta.arg);
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.bannerDeleteLoading = false;
        state.bannerDeleteSuccess = false;
        state.bannerDeleteError = (action.payload as string) ?? "Request failed";
      });
  },
});

export const { resetSuperAdminState } = superAdminSlice.actions;
export default superAdminSlice.reducer;
