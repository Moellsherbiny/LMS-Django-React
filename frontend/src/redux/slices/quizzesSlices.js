import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// ✅ Fetch all quizzes
export const fetchQuizzes = createAsyncThunk("quiz/fetchQuizzes", async () => {
  const response = await axiosInstance.get("/myquizzes/");
  return response.data;
});

// ✅ Fetch questions for a specific quiz
export const fetchQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async (quizId) => {
    const response = await axiosInstance.get(`/quiz/${quizId}/questions/`);
    return response.data;
  }
);

// ✅ Fetch all quiz results
export const fetchResults = createAsyncThunk("quiz/fetchResults", async () => {
  const response = await axiosInstance.get("/my-quizzes-results/");
  return response.data;
});

// ✅ Fetch a specific quiz result by ID
export const fetchResultById = createAsyncThunk(
  "quiz/fetchResultById",
  async (resultId) => {
    const response = await axiosInstance.get(`/my-quizzes-results/${resultId}/`);
    return response.data;
  }
);

// ✅ Submit answers and store result
export const submitQuiz = createAsyncThunk(
  "quiz/submitQuiz",
  async ({ quizId, answers }) => {
    const response = await axiosInstance.post(`/quiz/${quizId}/submit/`, {
      answers,
    });
    return response.data;
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizzes: [],
    questions: [],
    quizResults: [],
    quizResult: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 Fetch quizzes
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // 📌 Fetch questions
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
      })

      // 📌 Fetch all quiz results
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.quizResults = action.payload;
      })

      // 📌 Fetch specific quiz result
      .addCase(fetchResultById.fulfilled, (state, action) => {
        state.quizResult = action.payload;
      })

      // 📌 Submit quiz and store result
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.quizResult = action.payload;
        state.quizResults.push(action.payload);
      });
  },
});

export default quizSlice.reducer;
