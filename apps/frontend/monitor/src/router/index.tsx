import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import Dashboard from '@/views/Dashboard';
import Login from '@/views/Login';
import Register from '@/views/Register';

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
        ],
    },
    {
        path: 'account/login',
        element: <Login />,
    },
    {
        path: 'account/register',
        element: <Register />,
    },
]);
