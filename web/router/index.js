import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomeView } from "../pages/HomeView";
import { LoginView } from "../pages/LoginView";
import { SearchView } from "../pages/SearchView";
import { ProfileView } from "../pages/ProfileView";
import { RegisterView } from "../pages/RegisterView";

export const Router = () => {


    const PrivateRoute = ({ children }) => {
        const userLogged = localStorage.getItem('userLogged');
        if (!userLogged || userLogged === '') {
            return <Navigate to="/login" />
        } else {
            return children
        }
      };

    return (
        <BrowserRouter>
        
            <Routes>
                <Route path="/" element={
                    <PrivateRoute >
                        <HomeView />
                    </PrivateRoute>
                } />
                <Route path="/login" element={<LoginView />} />
                <Route path="/register" element={<RegisterView />} />
                <Route path="/profile" element={
                    <PrivateRoute >
                        <ProfileView />
                    </PrivateRoute>} />
                <Route path="/search" element={<SearchView />} />
                

                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
        </BrowserRouter>
    )
};
