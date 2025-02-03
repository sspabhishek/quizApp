import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
  currentQuiz: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    setCurrentQuiz: (state, action) => {
      state.currentQuiz = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const { setQuizzes, setCurrentQuiz, setQuestions  } = quizSlice.actions;
export default quizSlice.reducer;