// store/studentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { STUDENT } from "@/api/endpoint";
import api from "@/api/axios";
interface Student {
    id: string;
    name: string;
    email: string;
}

interface StudentState {
    students: Student[];
    loading: boolean;
    error: string | any;
}

const initialState: StudentState = {
    students: [],
    loading: false,
    error: null,
};

export const addStudent = createAsyncThunk(
    "student/addStudent",
    async (values: any, { rejectWithValue }) => {
        try {
            const response = await api.post<any>(
                STUDENT.CREATE_STUDENT,
                values
            );
            const { status, data } = response;
            return { ...data, status };
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addStudent.fulfilled, (state, action: PayloadAction<Student>) => {
                state.loading = false;
                state.students.push(action.payload);
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create student";
            });
    },
});

export default studentSlice.reducer;
