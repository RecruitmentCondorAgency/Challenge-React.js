import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { paths } from "../../common/constants/paths.constants";
import Login from "../../scenes/login/Login.scene";
import UserProfile from "../../scenes/profile/UserProfile.scene";
import UniversitySearch from "../../scenes/university/search/UniversitySearch.scene";
import PrivateRoute from "./PrivateRoute";
import Register from "../../scenes/register/Register.scene";

export const BrowserRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={paths.LOGIN} replace />} />
        <Route path={paths.LOGIN} element={<Login />} />
        <Route path={paths.REGISTER} element={<Register />} />
        <Route path={paths.UNIVERSITY.SEARCH} element={<UniversitySearch />} />
        <Route
          path={paths.USER.PROFILE}
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
