import { Navigate } from "react-router-dom";
import { paths } from "../../common/constants/paths.constants";
import { FCWithChildren } from "../../common/types/general.types";
import { withAuthProvider } from "../../providers/auth/auth.hoc";
import { useAuth } from "../../providers/auth/auth.hook";

const PrivateRoute: FCWithChildren = ({ children }) => {
  const [{ loggedUserLoading, authenticated }] = useAuth();

  if (loggedUserLoading) {
    return <>Loading...</>;
  }
  if (!authenticated) {
    return <Navigate to={paths.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default withAuthProvider(PrivateRoute);
