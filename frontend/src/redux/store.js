import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import quizReducer from "./quizSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
  },
});
