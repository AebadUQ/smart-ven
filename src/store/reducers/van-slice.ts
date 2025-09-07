// store/vanSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { VAN } from "@/api/endpoint";
import api from "@/api/axios";

// Define van type
interface Van {
  id: string;
  name: string;
  number: string;
  capacity: number;
}

interface VanState {
  vans: Van[];
  loading: boolean;
  error: string | null;
}

const initialState: VanState = {
  vans: [],
  loading: false,
  error: null,
};

// Thunk to get all vans
export const getAllVans = createAsyncThunk(
  "van/getAllVans",
  async (_, { rejectWithValue }) => {
    // try {
    //   const response = await api.get<any>(VAN.GET_ALL_VANS);
    //   const { status, data } = response;
    //   return { ...data, status };
    // } catch (error: any) {
    //   return rejectWithValue(error.response?.data || "Something went wrong");
    // }
  }
);

const vanSlice = createSlice({
  name: "van",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVans.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.vans = action.payload?.vans || []; // assuming API returns { vans: [...] }
      })
      .addCase(getAllVans.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch vans";
      });
  },
});

export default vanSlice.reducer;
