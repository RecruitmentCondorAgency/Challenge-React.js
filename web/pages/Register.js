import UserForm from "../components/users/UserForm";
import {getUser, postUser} from "../services/UserService";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const buttonText = 'Register'
    const linkText = "Already have an account yet? Sign In here."
    const linkHref = '/login'

    const submitHandler = async function ({email, password}) {
        const user = await getUser(email)

        if (user) {
            console.log("User already registered")
            return false
        }

        const result = await postUser(email, password)

        navigate("/login")
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