import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from '../pages/auth/Login'
import Profile from '../pages/university/Profile'
import Search from '../pages/university/Search'
import AppContext from '../context/AppContext';

const AppRouter = () => {

    const { user } = useContext(AppContext);
    const location = useLocation();
    const [previousPath, setPreviousPath] = useState(null);

    useEffect(() => {
        localStorage.setItem('previousPath', location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        const savedPath = localStorage.getItem('previousPath');
        setPreviousPath(savedPath);
    }, [user]);

    return (
        <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/profile" 
                element={
                    user ? <Profile /> : previousPath ? <Navigate to='/login' /> : <Navigate to={previousPath} />} />
            <Route path="/login" element={user ? <Navigate to="/search" /> : <Login />} />
            <Route path="/*" element={<Navigate to='/search' />} />
        </Routes>
    )
}

export default AppRouter
