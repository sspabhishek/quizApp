
import axios from "axios";
export const baseURL = import.meta.env.VITE_API_URL; // Backend URL

const getToken = () => {
  return localStorage.getItem("token");
};

const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${baseURL}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

export const register = async (name, email, password) => {
  const response = await fetchWithAuth(`${baseURL}/api/user/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  return response;
};

export const getQuizzes = async () => {
  const response = await fetchWithAuth(`${baseURL}/api/quiz`, {
    method: "GET",
  });
  return response;
};

export const addQuiz = async (quizData) => {
  const response = await fetchWithAuth(`${baseURL}/api/quiz/add`, {
    method: "POST",
    body: JSON.stringify(quizData),
  });
  return response;
};

export const joinQuiz = async (code, username) => {
  const response = await fetchWithAuth(`${baseURL}/api/quiz/join/${code}`, {
    method: "POST",
    body: JSON.stringify({ username }),
  });
  return response;
};

export const startQuiz = async (code) => {
  const response = await fetchWithAuth(`${baseURL}/api/quiz/start/${code}`, {
    method: "POST",
  });
  return response;
};

export const getQuiz = async (code) => {
  const response = await fetch(`${baseURL}/api/quiz/${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

export const submitAnswer = async (code, questionIndex, answer) => {
  const response = await fetchWithAuth(`${baseURL}/api/quiz/answer/${code}`, {
    method: "POST",
    body: JSON.stringify({ questionIndex, answer }),
  });
  return response;
};


// ✅ Function to save a quiz
export const saveQuiz = async (quizData) => {
  try {
    const response = await axios.post(`${baseURL}/api/quiz/practice-quizzes`, quizData);
    return response.data;
  } catch (error) {
    console.error("❌ Error saving quiz:", error);
    return { error: "Failed to save quiz" };
  }
};

export const getPracticeQuizzes = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/quiz/practice-quizzes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
};
