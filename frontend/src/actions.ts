import axios from 'axios';

// Define response types
interface LoginResponse {
  token: string
}

interface LogoutResponse {
  message: string
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

// Create Axios Instance
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

// Login function with typed parameters and return type
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await API.post<LoginResponse>('/authentication/login', { username, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

// Logout function
export const logout = async (): Promise<LogoutResponse> => {
  const response = await API.post<LogoutResponse>('/authentication/logout', {});
  localStorage.removeItem('token');
  return response.data;
}

// Fetch products function with typed query parameter and return type
export const fetchProducts = async (query: string): Promise<Product[]> => {
  const response = await API.get<Product[]>(`/products/list?query=${query}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};