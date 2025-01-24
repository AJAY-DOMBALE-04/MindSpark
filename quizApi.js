import axios from 'axios';

const API_URL = 'http://localhost:5000/api/quizzes';

// Function to fetch all quizzes
export const fetchQuizzes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Function to add a new quiz
export const addQuiz = async (quizData) => {
  const response = await axios.post(API_URL, quizData);
  return response.data;
};
