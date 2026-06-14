import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// 请求拦截器：注入 Token
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => Promise.reject(error)
);

// 响应拦截器：处理错误和提取数据
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // 触发 Token 刷新逻辑或跳转登录
            localStorage.removeItem('token');
            window.location.href = '/account/login';
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);
