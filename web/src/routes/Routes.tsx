import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '../utils/partials/Navbar'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Search from '../pages/Search'
import Error404 from '../utils/errors/Error404'
import UserContextProvider from '../context/UserContext'

export default function Routes(props) {
    

    return (
        <Router>
            <UserContextProvider>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Login />} exact />
                    <Route path="/login" element={<Login />} exact />
                    <Route path="/profile" element={<Profile />} exact />
                    <Route path="/search" element={<Search />} exact />
                    <Route path="*" element={<Error404/>} />
                </Routes>
            </UserContextProvider>
        
    </Router>
    )
}
