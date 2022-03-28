import Home from './pages/Home'
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import { selectUser } from "./store/user/selects";

const LastRedirectRoute = () => {
  const actualUser = useSelector(selectUser)
  if (!actualUser) {
    return <Navigate to={'/login'} replace />;
  } else {
    return <Navigate to={'/home'} replace />;
  }
};

const ProtectedRoute = ({ redirectPath = '/landing' }) => {
  const actualUser = useSelector(selectUser)
  if (!actualUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={
      <ProtectedRoute redirectPath='/login' />
    }>
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
    <Route path="*" element={<LastRedirectRoute />}></Route>
  </Routes>
)

export default App
