import UserContext from "../store/user-context";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();
    const userCtx = useContext(UserContext)

    userCtx.logout()
    navigate('/login')

    return null
}