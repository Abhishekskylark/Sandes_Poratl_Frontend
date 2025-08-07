import axios from 'axios';

export async function loginAdmin({ mobile, password }) {
  try {
    const response = await axios.post('http://localhost:5000/api/login', { mobile, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Login failed';
  }
}