import { Route, Routes } from "react-router-dom";

import UniversitiesList from "./pages/UniversitiesList";
import Register from "./pages/Register";
import UniversityDetail from "./pages/UniversityDetail";
import Login from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";
import Loader from "./components/Loader";

const AppRoutes: React.FC = () => {
  const { isAuthResolved } = useAuth();

  if (!isAuthResolved) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<UniversitiesList />} />
      <Route path="/university-detail" element={<UniversityDetail />} />
    </Routes>
  );
};

export default AppRoutes;
