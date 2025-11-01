import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await api.post('/api/auth/register', { name, email, password });
  return response.data;
};

// Product APIs
export const getProducts = async () => {
  const response = await api.get('/api/products');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

export const createProduct = async (formData) => {
  const response = await api.post('/api/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProduct = async (id, formData) => {
  const response = await api.put(`/api/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/api/products/${id}`);
  return response.data;
};

// Cart APIs
export const getCart = async () => {
  const response = await api.get('/api/cart');
  return response.data;
};

export const addToCart = async (productId, quantity) => {
  const response = await api.post('/api/cart', { productId, quantity });
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await api.put('/api/cart', { productId, quantity });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await api.delete(`/api/cart/${productId}`);
  return response.data;
};

// Order APIs
export const createOrder = async (shippingAddress) => {
  const response = await api.post('/api/orders', { shippingAddress });
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/api/orders');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/api/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/api/orders/${id}`, { status });
  return response.data;
};

// User APIs
export const getUsers = async () => {
  const response = await api.get('/api/users');
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/api/users/profile');
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/api/users/${id}`);
  return response.data;
};

export const toggleUserBlock = async (id) => {
  const response = await api.put(`/api/users/${id}/block`);
  return response.data;
};

export default api;
