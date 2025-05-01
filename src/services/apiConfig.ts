
import axios from 'axios';

// Create a reusable API client
export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    'x-apisports-key': import.meta.env.VITE_FOOTBALL_API_KEY || '',
    'Content-Type': 'application/json',
  },
});

// Error handler helper
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || 'An unknown error occurred';
  }
  return 'An unknown error occurred';
};
