import { createContext, useState } from 'react'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const isAuthenticated = !!user

	const login = (data) => {
		setUser(data)
	}
	const logout = () => {
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
