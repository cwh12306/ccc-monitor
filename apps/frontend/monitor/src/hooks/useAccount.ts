import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { userService } from '@/services/account';

export const accountKeys = {
    login: ['login'] as const,
    register: ['register'] as const,
    publicKey: ['publicKey'] as const,
};

// 登录
export const useLogin = () => {
    return useMutation({
        mutationKey: accountKeys.login,
        mutationFn: userService.login,
        onSuccess: data => {
            if (data?.data?.success) {
                // 登录成功后，将 Token 存储到本地存储
                localStorage.setItem('token', data.data.data.access_token);
                toast.success('登录成功', { position: 'top-center' });
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                toast.error(data?.data?.msg || '登录失败', { position: 'top-center' });
            }
        },
    });
};

// 注册
export const useRegister = () => {
    return useMutation({
        mutationKey: accountKeys.register,
        mutationFn: userService.register,
        onSuccess: () => {
            toast.success('注册成功', { position: 'top-center' });
            setTimeout(() => {
                window.location.href = '/account/login';
            }, 1000);
        },
    });
};

export const usePublicKey = (onSuccess: (key: string) => void) => {
    return useMutation({
        mutationKey: accountKeys.publicKey,
        mutationFn: userService.getPublicKey,
        onSuccess: data => onSuccess(data?.data?.data),
    });
};
