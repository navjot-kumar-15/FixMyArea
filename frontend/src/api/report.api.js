import apiClient from './apiClient';

export const fetchReports = async (page = 1, limit = 10) => {
  const response = await apiClient.get(`/report?page=${page}&limit=${limit}`);
  return response.data; // CustomResponse shape: { success, message, data }
};
