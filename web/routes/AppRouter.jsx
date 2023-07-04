import Login from '../pages/auth/Login'
import List from '../pages/university/List'
import Favorite from '../pages/university/Favorite'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/list" element={<List />} />
                <Route path="/favorite" element={<Favorite />} />

                <Route path="/*" element={<Navigate to='/login' />} />
            </Routes>
        </Router>
    )
}

export default AppRouter
