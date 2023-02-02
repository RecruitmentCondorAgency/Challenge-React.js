import UserForm from "../components/users/UserForm";
import {getUser} from "../services/UserService";
import {useContext} from "react";
import UserContext from "../store/user-context";

export default function Login() {
    const userCtx = useContext(UserContext)

    const buttonText = 'Sign In'
    const linkText = "Don't have an account yet? Register here."
    const linkHref = '/register'

    const submitHandler = async function ({email, password}) {
        const user = await getUser(email)

        if (user && password === user.password) {
            userCtx.login(user.id, user.email)
        } else {
            console.log('Error')
        }
    }

    return (
        <UserForm
            buttonText={buttonText}
            linkText={linkText}
            linkHref={linkHref}
            onSubmit={submitHandler}
        />
    )
}