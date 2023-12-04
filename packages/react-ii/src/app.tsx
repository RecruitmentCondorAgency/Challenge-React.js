import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Search from "./pages/search/search";
import University from "./pages/university/university";
import Layout from "./components/layout/layout";

import { Provider } from 'react-redux'
import { store } from './store'

import ProtectedRoutes from "./components/protected-routes/protected-routes";
import Session from "./components/session/session";

export const App = () => {
    
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>
                        <Session />
                        <Routes>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/university" element={<University />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </Provider>
        </>
    );
}
