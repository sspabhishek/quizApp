import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (email, password) => {
  return await API.post("/user/login", { email, password });
};

export const register = async (name, email, password) => {
  return await API.post("/user/register", { name, email, password });
};

export const getQuizzes = async () => {
  return await API.get("/quiz");
};

export const addQuiz = async (quizData) => {
  return await API.post("/quiz/add", quizData);
};
