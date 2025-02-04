import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch quizzes
export const fetchQuizzes = createAsyncThunk("quiz/fetchQuizzes", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/quiz/practice-quizzes");
    return response.data;
  } catch (error) {
    throw Error('Failed to fetch quizzes');
  }
});

const practiceQuizSlice = createSlice({
  name: "practicequiz",
  initialState: { quizzes: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default practiceQuizSlice.reducer;
