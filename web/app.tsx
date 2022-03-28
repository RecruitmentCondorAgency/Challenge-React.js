import TransitionGroup from "./components/TransitionGroup";
import AuthGuard from "./guards/AuthGuard";
import Home from './pages/Home'
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate, Route, Routes } from 'react-router-dom';
import Profile from "./pages/Profile";

const App = () => (
  <AuthGuard>
    <TransitionGroup>
      {(actualPath) => (
        <Routes location={actualPath}>
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="*"
            element={<Navigate to="/home" replace />}
          />
        </Routes>
      )}
    </TransitionGroup>
  </AuthGuard>
)

export default App
