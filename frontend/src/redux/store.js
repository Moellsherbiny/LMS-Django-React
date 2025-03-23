import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import coursesReducer from "./slices/coursesSlice";
import quizzesReducer from "./slices/quizzesSlices";
import assignmentsReducer from "./slices/assignmentsSlices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    assignments: assignmentsReducer,
    quizzes: quizzesReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
