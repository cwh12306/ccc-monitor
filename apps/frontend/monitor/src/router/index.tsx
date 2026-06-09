import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import Dashboard from '@/views/Dashboard';
import Login from '@/views/Login';

import AuthRoute from './AuthRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthRoute>
                <Outlet />
            </AuthRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'login',
                element: <Login />,
            },
        ],
    },
    {
        path: 'account/login',
        element: <Login />,
    },
]);
