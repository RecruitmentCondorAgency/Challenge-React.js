import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Search from "./pages/search/search";
import University from "./pages/university/university";
import Layout from "./components/layout/layout";

import { Provider } from 'react-redux'
import { store } from './store'

export const App = () => {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/university" element={<University />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </Provider>
        </>
    );
}
