import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './router/Router';
import { Login } from './pages/Auth/Login';
import { Home } from './pages/Home/Home';
import { Header } from './shared/components/header';
import { Profile } from './pages/Profile/Profile';
export const App = () => {
    return <>
         <BrowserRouter >
          <Header></Header>
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<Home/>} path="/home" />
                <Route element={<Profile/>} path="/profile"/>
            </Route>
            <Route element={<Login/>} path="/login"/>
          </Routes>
      </BrowserRouter>
    </>
}
