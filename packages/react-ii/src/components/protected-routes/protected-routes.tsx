import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Login from "../../pages/login/login";

export type ProtectedProps {
    isLoggedIn: boolean,
    children: ReactNode
}

const ProtectedRoutes: FC<ProtectedProps> = (props: ProtectedProps) => {
    const { isLoggedIn, children } = props;
    return (<>
        {isLoggedIn ? { children } : <Navigate to={'/login'} />}
    </>
    )
}
export default ProtectedRoutes
