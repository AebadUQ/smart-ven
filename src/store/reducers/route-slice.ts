import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";
import { ROUTE } from "@/api/endpoint";

type TripDays = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday?: boolean;
  sunday?: boolean;
};

type Point = { lat: number; long: number };

interface RouteState {
  routes: any[];
  routeDetails: any | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  pagination: { total: number; page: number; limit: number };
}

const initialState: RouteState = {
  routes: [],
  routeDetails: null,
  loading: false,
  error: null,
  success: false,
  pagination: { total: 0, page: 1, limit: 10 },
};

// ─── Thunks ──────────────────────────────────────────────

// Get all routes
export const getAllRoutes = createAsyncThunk(
  "route/getAllRoutes",
  async (
    { page = 1, limit = 10 }: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(ROUTE.GET_ALL_ROUTE, {
        params: { page, limit },
      });
      const { data, pagination } = response.data;
      return { routes: data, pagination };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to fetch routes");
    }
  }
);

// Get route by ID
export const getRouteById = createAsyncThunk(
  "route/getRouteById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${ROUTE.GET_ROUTE_BY_ID}/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to fetch route details");
    }
  }
);

// Create route
export const createRoute = createAsyncThunk(
  "route/createRoute",
  async (
    payload: {
      vanId: string;
      title: string;
      startTime: string;
      tripType: "morning" | "evening";
      tripDays: TripDays;
      startPoint: Point;
      endPoint: Point;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(ROUTE.CREATE_ROUTE, payload);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to create route");
    }
  }
);

// ✅ Update route
export const updateRoute = createAsyncThunk(
  "route/updateRoute",
  async (payload: any, { rejectWithValue }) => {
    try {
      // ✅ Using POST (since your API expects it that way)
      const response = await api.post(`${ROUTE.UPDATE_ROUTE}`, payload);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to update route");
    }
  }
);


// ─── Slice ──────────────────────────────────────────────
const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    clearRouteStatus: (state) => {
      state.success = false;
      state.error = null;
    },
    clearRouteDetails: (state) => {
      state.routeDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all routes
      .addCase(getAllRoutes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRoutes.fulfilled, (state, action) => {
        state.loading = false;
        state.routes = action.payload.routes;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllRoutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get route by ID
      .addCase(getRouteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRouteById.fulfilled, (state, action) => {
        state.loading = false;
        state.routeDetails = action.payload;
      })
      .addCase(getRouteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create route
      .addCase(createRoute.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createRoute.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.routes.unshift(action.payload);
      })
      .addCase(createRoute.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // ✅ Update route
      .addCase(updateRoute.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateRoute.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const index = state.routes.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.routes[index] = action.payload;
        }

        if (state.routeDetails?.id === action.payload.id) {
          state.routeDetails = action.payload;
        }
      })
      .addCase(updateRoute.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRouteStatus, clearRouteDetails } = routeSlice.actions;
export default routeSlice.reducer;
