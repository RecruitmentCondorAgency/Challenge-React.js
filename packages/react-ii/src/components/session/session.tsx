import { FC, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/users/userSlice';
import { User } from "../../types/user";
import UserService from "../../services/user-service";


const Session = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUser = async () => {
            const userFromStorage = localStorage.getItem("currentUser");
            if (userFromStorage && Object.keys(userFromStorage).length) {
                const user = await UserService.getUserByEmail((JSON.parse(userFromStorage) as User).email);
                dispatch(setUser(user.response))
            }
        }
        fetchUser()
    }, []);
    return (<></>)
}
export default Session
