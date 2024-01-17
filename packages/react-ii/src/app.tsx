import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './router/Router';
import { Login } from './pages/Auth/Login';
import { Home } from './pages/Home/Home';
import { Univeristy } from './pages/University/Univeristy';
import { Header } from './shared/components/header';
export const App = () => {
    return <>
    <Header></Header>
         <BrowserRouter >
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<Home/>} path="/home" />
                <Route element={<Univeristy/>} path="/products"/>
            </Route>
            <Route element={<Login/>} path="/login"/>
          </Routes>
      </BrowserRouter>
    </>
}
