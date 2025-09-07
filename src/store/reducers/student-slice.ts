import { createSlice, createAsyncThunk, PayloadAction, current } from "@reduxjs/toolkit";
import { STUDENT } from "@/api/endpoint";
import api from "@/api/axios";
import {
  StudentRecord,
  PaginationMeta,
  StudentState,
} from "@/types/student";

const initialState: StudentState = {
  students: [],
  pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
  loading: false,
  error: null,
};

// ✅ Get All Students
export const getAllStudents = createAsyncThunk(
  "student/getAllStudents",
  async (
    { page = 1, limit = 10 }: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(STUDENT.GET_ALL_STUDENTS, {
        params: { page, limit },
      });
      const { data, pagination } = response.data;
      return { students: data as StudentRecord[], pagination };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch students");
    }
  }
);

// ✅ Add Student
export const addStudent = createAsyncThunk(
  "student/addStudent",
  async (values: any, { rejectWithValue }) => {
    try {
      const response = await api.post<any>(STUDENT.CREATE_STUDENT, values);
      const { status, data } = response;
      return { ...data, status };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create student");
    }
  }
);

// ✅ Delete Students
export const deleteStudents = createAsyncThunk(
  "student/deleteStudents",
  async (kidIds: string[], { rejectWithValue }) => {
    try {
      const response = await api.patch<any>(STUDENT.DELETE_STUDENT, { kidIds });
      const { status, data } = response;
      return { kidIds, status, ...data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete students");
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Students
      .addCase(getAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllStudents.fulfilled,
        (
          state,
          action: PayloadAction<{ students: StudentRecord[]; pagination: PaginationMeta }>
        ) => {
          state.loading = false;
          state.students = action.payload.students;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(getAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add Student
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Students
      .addCase(deleteStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudents.fulfilled, (state, action: PayloadAction<{ kidIds: string[] }>) => {
        state.loading = false;
        console.log("students before delete:", current(state));
        state.students = state.students.filter(
          (s) => !action.payload.kidIds.includes(s.student.id)
        );
      })
      .addCase(deleteStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentSlice.reducer;
