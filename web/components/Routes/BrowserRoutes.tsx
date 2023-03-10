import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { paths } from "../../common/constants/paths.constants";
import Login from "../../scenes/login/Login.scene";
import { UniversityFavourites } from "../../scenes/university/favourites";
import { UniversitySearch } from "../../scenes/university/search";
import PrivateRoute from "./PrivateRoute";

export const BrowserRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={paths.LOGIN} replace />} />
        <Route path={paths.LOGIN} element={<Login />} />
        <Route
          path={paths.UNIVERSITY.SEARCH}
          element={
            <PrivateRoute>
              <UniversitySearch />
            </PrivateRoute>
          }
        />
        <Route
          path={paths.UNIVERSITY.FAVOURITES}
          element={
            <PrivateRoute>
              <UniversityFavourites />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
