import { useState } from 'react';
import { AuthContext } from './routes/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRoute from './routes/AuthRoute';
import Login from './screens/login.js/login';
import Signup from './screens/signup/signup';
import ProtectedRoute from './routes/PrivateRoute';
import Dashboard from './screens/dashboard/Dashboard';
import University from './screens/university/University';

export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedToken = localStorage.getItem("token");
        return !!storedToken;
    });

    const login = () => {
        const tokenItem = localStorage.getItem("token");
        if (tokenItem) {
            setIsAuthenticated(true);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
                        exact
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                {" "}
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
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
