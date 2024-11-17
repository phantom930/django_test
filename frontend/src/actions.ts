import axios from 'axios';

// Define response types
interface LoginResponse {
  token: string
}

interface LogoutResponse {
  message: string
}

interface ProductResponse {
  products: Product[];
  selected: number[];
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
  const response = await API.post<LogoutResponse>('/authentication/logout', {}, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
  localStorage.removeItem('token');
  return response.data;
}

// Fetch products function with typed query parameter and return type
export const fetchProducts = async (query: string): Promise<ProductResponse> => {
  const response = await API.get<ProductResponse>(`/products/list?query=${query}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

// Select product item
export const selectProduct = async (id: number): Promise<Product> => {
  const response = await API.post<Product>(`/products/select`, { id }, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
}