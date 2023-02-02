import React, {useState} from 'react'

const UserContext = React.createContext({
    id: '',
    email: '',
    isLoggedIn: false,
    login: (id, email) => {},
    logout: () => {}
})

export const UserContextProvider = function ({ children }) {
    const [id, setId] = useState(null)
    const [email, setEmail] = useState(null)

    const loginHandler = function (id, email) {
        setId(id)
        setEmail(email)
    }

    const logOutHandler = function () {
        setId(null)
        setEmail(null)
    }

    const contextValue = {
        id,
        email,
        isLoggedIn: !!id && !!email,
        login: loginHandler,
        logout: logOutHandler
    }

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export default UserContext