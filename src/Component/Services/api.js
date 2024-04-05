// api.js
import axios from "axios";
const API_URL = "https://qbitlog-trainee.onrender.com/8000";


export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

const apiService = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const signup = async (userData) => {
    try {
      const response = await apiService.post('/api/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };
