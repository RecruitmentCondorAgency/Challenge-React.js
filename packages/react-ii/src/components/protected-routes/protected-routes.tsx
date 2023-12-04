import { FC, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../../types/user";

export type ProtectedProps = {
    children: ReactNode
}

const ProtectedRoutes: FC<ProtectedProps> = (props: ProtectedProps) => {
    const { children } = props;
    const getLocalStorageUser = () => {
        const userFromStorage = localStorage.getItem("currentUser");
        if (userFromStorage && Object.keys(userFromStorage).length) {
            return JSON.parse(userFromStorage) as User
        } else {
            return null;
        }
    }

    return (<>
        {!!(getLocalStorageUser()?.email) ? { children } : <Navigate to={'/login'} />}
    </>
    )
}
export default ProtectedRoutes
