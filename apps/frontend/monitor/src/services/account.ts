import { apiClient } from '@/lib/axios';
import type { User } from '@/types/user';

export const userService = {
    login: (data: Partial<User>) =>
        apiClient.post<{ success: boolean; data: { access_token: string }; msg: string }>(`/api/auth/login/`, data),
    register: (data: Partial<User>) => apiClient.post<User>('/api/auth/register/', data),
    getPublicKey: () => apiClient.get<{ data: string }>('/api/auth/publicKey/'),
};
