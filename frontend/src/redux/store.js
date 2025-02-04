import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import quizReducer from "./quizSlice";
import practiceQuizReducer from "./practiceQuizSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    practicequiz: practiceQuizReducer, 
  },
});
