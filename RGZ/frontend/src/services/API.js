import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
  baseURL: API_URL,
});

export const videoService = {
  getVideoStreamUrl: (id) => `${API_URL}videos/${id}/stream/`,
  getVideos: () => api.get('videos/'),
  uploadVideo: (formData) => api.post('videos/upload/', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    },
  }),
};

export const authService = {
  register: (userData) => api.post('register/', userData),
  requestCode: (email) => api.post('request-code/', { email }),
};

export default api;