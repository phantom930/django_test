import axios from 'axios';

// Define response types
interface LoginResponse {
  token: string
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stoke: number;
}

// Create Axios Instance
const API = axios.create({
  baseURL: 'http://localhost:8000'
});

// Login function with typed parameters and return type
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await API.post<LoginResponse>('/authentication/login', { username, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};