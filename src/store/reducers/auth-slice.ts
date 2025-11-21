import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AUTH } from "@/api/endpoint";
import api from "@/api/axios";

// ─── Types ─────────────────────────────────────────────────────
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;           // main auth token
  resetToken: string | null;      // reset/OTP token
  loading: boolean;
  error: string | null;
  userProfile?:any
}

const initialState: AuthState = {
  user: null,
  token: null,
  resetToken: null,
  loading: false,
  error: null,
  userProfile:null
};

// ─── Thunks ────────────────────────────────────────────────────

// 🔹 Login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<any>(AUTH.SCHOOL_ADMIN, credentials);
      const { status, data } = response.data;
      return { ...data, status };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// 🔹 Forgot Password (returns OTP + temporary token)
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (payload: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<any>(AUTH.FORGET_PASSWORD, payload);
      const { status, data } = response.data;

     

      return { ...data, status };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Forgot password request failed");
    }
  }
);
// 🔹 Get Profile
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<any>(AUTH.GET_PROFILE);
      const { status, data } = response.data;
      return { ...data, status };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
);

// 🔹 Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    payload: { email: string; otp: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post<any>(AUTH.RESET_PASSWORD, payload);
      const { status, data } = response.data;
      return { ...data, status };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Reset password request failed");
    }
  }
);

// 🔹 Resend OTP
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post<any>(AUTH.RESEND_OTP);
      const { status, data } = response.data;
      return { ...data, status };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Resend OTP request failed");
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.resetToken = null;
      state.error = null;
      state.loading = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Login failed";
      })
// ── Get Profile
.addCase(getProfile.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(getProfile.fulfilled, (state, action: PayloadAction<any>) => {
  state.loading = false;
  state.userProfile = action.payload;
})
.addCase(getProfile.rejected, (state, action) => {
  state.loading = false;
  state.error = (action.payload as string) || "Failed to fetch profile";
})

      // ── Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.resetToken = action.payload?.token || null;
        if (typeof window !== "undefined" && action.payload?.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Forgot password request failed";
      })

     
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
