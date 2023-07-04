import React, { createContext, useState, ReactNode } from "react";
import AppContext, { AppContextType, AppState } from "./AppContext";
import { User } from "../types/types";

type AppProviderProps = {
	children: ReactNode;
};

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [user, setuser] = useState<User | null>(null);

	const updateUser = (newUser: User) => {
		setuser(newUser);
	};

	const appContextValue: AppContextType = {
		user,
		updateUser,
	};

	return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
