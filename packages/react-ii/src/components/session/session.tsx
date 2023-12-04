import { FC, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/users/userSlice';
import { User } from "../../types/user";


const Session = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const userFromStorage = localStorage.getItem("currentUser");
        if (userFromStorage && Object.keys(userFromStorage).length) {
            dispatch(setUser(JSON.parse(userFromStorage) as User))
        }
    }, []);
    return (<></>)
}
export default Session
