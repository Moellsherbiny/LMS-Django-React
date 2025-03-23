import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Configure axios to send credentials
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/api";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      await axios.post(
        "/auth/login/",
        { username, password },
        { withCredentials: true }
      );
      const response = await axios.get("/auth/user/", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const isAuth = createAsyncThunk(
  "auth/user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/user/", {
        withCredentials: true,
      });
      return response.data;
    } catch {
      return rejectWithValue(null);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/auth/logout/", {}, { withCredentials: true });
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(isAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(isAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(isAuth.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
