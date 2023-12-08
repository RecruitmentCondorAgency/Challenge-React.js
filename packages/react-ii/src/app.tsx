import { useState } from 'react';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRoute from './auth/AuthRoute';
import Login from './pages/login.js/login';
import Signup from './pages/signup/signup';
import ProtectedRoute from './auth/PrivateRoute';
import Dashboard from './pages/dashboard/Dashboard';
import University from './pages/university/University';

export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem("token");
        return token ? true : false;
    });

    const loginCtx = () => {
        const tokenItem = localStorage.getItem("token");
        if (tokenItem) {
            setIsAuthenticated(true);
        }
    };

    const logoutCtx = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginCtx, logoutCtx }}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <AuthRoute>
                                <Login />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <AuthRoute>
                                <Login />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <AuthRoute>
                                <Signup />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                {" "}
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/university"
                        element={
                            <ProtectedRoute>
                                <University />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}