import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { STUDENT } from "@/api/endpoint";
import api from "@/api/axios";
import type { StudentRecord, PaginationMeta } from "@/types/student";

type SliceState = {
  students: StudentRecord[];
  pagination: PaginationMeta;
  loading: boolean;
  error: string | null;
  studentDetail: StudentRecord | null;
  detailLoading: boolean;
};

const initialState: SliceState = {
  students: [],
  pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
  loading: false,
  error: null,
  studentDetail: null,
  detailLoading: false,
};

export const getAllStudents = createAsyncThunk(
  "student/getAllStudents",
  async (
    { page = 1, limit = 10 }: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(STUDENT.GET_ALL_STUDENTS, { params: { page, limit } });
      const { data, pagination } = response.data as {
        data: StudentRecord[];
        pagination: PaginationMeta;
      };
      return { students: data, pagination };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to fetch students");
    }
  }
);

export const getStudentDetail = createAsyncThunk(
  "student/getStudentDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`${STUDENT.GET_STUDENT_BY_ID}/${id}`);
      const detail = (res.data?.data ?? res.data) as StudentRecord;
      return detail;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to fetch student detail");
    }
  }
);

export const addStudent = createAsyncThunk(
  "student/addStudent",
  async (values: any, { rejectWithValue }) => {
    try {
      const res = await api.post(STUDENT.CREATE_STUDENT, values);
      const created = (res.data?.data ?? res.data) as StudentRecord;
      return created;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to create student");
    }
  }
);

export const deleteStudents = createAsyncThunk(
  "student/deleteStudents",
  async (kidIds: string[], { rejectWithValue }) => {
    try {
      await api.patch(STUDENT.DELETE_STUDENT, { kidIds });
      return { kidIds };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "Failed to delete students");
    }
  }
);

export const deleteStudentsAndRefetch = createAsyncThunk<
  void,
  string[],
  { state: { student: SliceState } }
>("student/deleteStudentsAndRefetch", async (kidIds, { dispatch, getState, rejectWithValue }) => {
  try {
    await dispatch(deleteStudents(kidIds)).unwrap();
    const { pagination, students } = getState().student;
    const isPageEmpty = students.length === 0 && pagination.page > 1;
    const nextPage = isPageEmpty ? pagination.page - 1 : pagination.page;
    await dispatch(getAllStudents({ page: nextPage, limit: pagination.limit })).unwrap();
  } catch (err: any) {
    throw rejectWithValue(err?.message || "Failed to delete & refresh");
  }
});

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetStudentDetail(state) {
      state.studentDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.error = (action.payload as string) || "Failed to fetch students";
      })
      .addCase(getStudentDetail.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(getStudentDetail.fulfilled, (state, action: PayloadAction<StudentRecord>) => {
        state.detailLoading = false;
        state.studentDetail = action.payload;
      })
      .addCase(getStudentDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = (action.payload as string) || "Failed to fetch student detail";
      })
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action: PayloadAction<StudentRecord>) => {
        state.loading = false;
        if (state.students.length < state.pagination.limit) {
          state.students.unshift(action.payload);
        }
        state.pagination.total = Math.max(0, state.pagination.total + 1);
        state.pagination.totalPages = Math.ceil(state.pagination.total / state.pagination.limit);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create student";
      })
      .addCase(deleteStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteStudents.fulfilled,
        (state, action: PayloadAction<{ kidIds: string[] }>) => {
          state.loading = false;
          state.students = state.students.filter(
            (s) => !action.payload.kidIds.includes(s.student.id)
          );
          state.pagination.total = Math.max(0, state.pagination.total - action.payload.kidIds.length);
          state.pagination.totalPages =
            Math.ceil(state.pagination.total / state.pagination.limit) || 1;
          if (state.studentDetail && action.payload.kidIds.includes(state.studentDetail.student.id)) {
            state.studentDetail = null;
          }
        }
      )
      .addCase(deleteStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to delete students";
      });
  },
});

export const { resetStudentDetail } = studentSlice.actions;
export default studentSlice.reducer;
