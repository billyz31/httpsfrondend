import axios from 'axios';

// API 基礎配置
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// 創建 axios 實例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 請求攔截器
apiClient.interceptors.request.use(
  (config) => {
    // 可以在這裡添加認證 token 等
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// 響應攔截器
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.message);
    
    // 統一錯誤處理
    if (error.response?.status === 401) {
      // 處理未授權錯誤
      console.warn('Unauthorized access - redirecting to login');
    } else if (error.response?.status >= 500) {
      // 處理服務器錯誤
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

// API 方法
export const api = {
  // 健康檢查
  health: () => apiClient.get('/health'),
  
  // 用戶相關
  users: {
    getAll: () => apiClient.get('/users'),
    getById: (id) => apiClient.get(`/users/${id}`),
    create: (userData) => apiClient.post('/users', userData),
    update: (id, userData) => apiClient.put(`/users/${id}`, userData),
    delete: (id) => apiClient.delete(`/users/${id}`),
  },
  
  // 統計數據
  stats: () => apiClient.get('/stats'),
};

export default apiClient;