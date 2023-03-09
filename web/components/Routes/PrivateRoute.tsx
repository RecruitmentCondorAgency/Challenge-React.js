import { FC } from "react";
import { Route, RouteProps } from "react-router-dom";

export const PrivateRoute: FC<RouteProps> = (props) => {
  return <Route {...props} />;
};
