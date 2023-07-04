import { createContext } from "react";
import { User } from "../types/types";

export interface AppState {
	count: number;
}

export interface AppContextType {
	user: User | null;
	updateUser: (newUser: User | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
