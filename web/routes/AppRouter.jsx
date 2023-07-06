import Login from '../pages/auth/Login'
import Profile from '../pages/university/Profile'
import Search from '../pages/university/Search'
import { Route, Routes, Navigate } from "react-router-dom";
import AppContext from '../context/AppContext';
import { useContext } from 'react';

const AppRouter = () => {

    const { user } = useContext(AppContext);

    return (
        <Routes>
            <Route path="/login" element={user ? <Navigate to="/search" /> : <Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to='/login' />} />
            <Route path="/*" element={<Navigate to='/search' />} />
        </Routes>
    )
}

export default AppRouter
