import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchAssignments = createAsyncThunk(
  "assignments/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/my-assignments/");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch assignments"
      );
    }
  }
);

export const fetchAssignmentDetails = createAsyncThunk(
  "assignments/fetchDetails",
  async (assignmentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/assignments/${assignmentId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch assignment details"
      );
    }
  }
);

export const submitAssignment = createAsyncThunk(
  "assignments/submit",
  async ({ assignmentId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/assignments/${assignmentId}/submit/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit assignment"
      );
    }
  }
);

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState: {
    assignments: [],
    currentAssignment: null,
    loading: false,
    submitting: false,
    error: null,
    submissionError: null,
    submissionSuccess: false,
  },
  reducers: {
    clearAssignmentErrors: (state) => {
      state.error = null;
      state.submissionError = null;
    },
    resetSubmissionStatus: (state) => {
      state.submissionSuccess = false;
      state.submissionError = null;
      state.submitting = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAssignments
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchAssignmentDetails
      .addCase(fetchAssignmentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAssignment = action.payload;
      })
      .addCase(fetchAssignmentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle submitAssignment
      .addCase(submitAssignment.pending, (state) => {
        state.submitting = true;
        state.submissionError = null;
        state.submissionSuccess = false;
      })
      .addCase(submitAssignment.fulfilled, (state, action) => {
        state.submitting = false;
        state.submissionSuccess = true;
        // Update the current assignment with submission data
        state.currentAssignment = {
          ...state.currentAssignment,
          ...action.payload,
        };
        // Update the assignment in the assignments list
        const index = state.assignments.findIndex(
          (assignment) => assignment.id === action.payload.id
        );
        if (index !== -1) {
          state.assignments[index] = {
            ...state.assignments[index],
            submitted: true,
            submissionDate: action.payload.submissionDate,
          };
        }
      })
      .addCase(submitAssignment.rejected, (state, action) => {
        state.submitting = false;
        state.submissionError = action.payload;
      });
  },
});

export const { clearAssignmentErrors, resetSubmissionStatus } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
