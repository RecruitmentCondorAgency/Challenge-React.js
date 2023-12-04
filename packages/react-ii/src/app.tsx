import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Search from "./pages/search/search";
import University from "./pages/university/university";
import Layout from "./components/layout/layout";

import { Provider } from 'react-redux'
import { store } from './store'
import Protected from "./components/protected-routes/protected-routes";
import { useAppSelector } from "./hooks";
import ProtectedRoutes from "./components/protected-routes/protected-routes";

export const App = () => {
    const user = useAppSelector((state) => state.users)
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/search" element={<ProtectedRoutes isLoggedIn={!!user.user.email}><Search /></ProtectedRoutes>} />
                            <Route path="/university" element={<ProtectedRoutes isLoggedIn={!!user.user.email}><University /></ProtectedRoutes>} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </Provider>
        </>
    );
}
