import { Route, Routes } from 'react-router-dom';

import UniversitiesList from './pages/UniversitiesList';
import Register from './pages/Register';
import Profile from './pages/UniversityDetail';
import Login from './pages/Login';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/" element={<UniversitiesList />} />
      <Route path="/detail" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
