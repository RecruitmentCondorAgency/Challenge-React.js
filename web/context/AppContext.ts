import { createContext } from "react";
import { Favorite, University, User } from "../types/types";

export interface AppState {
	count: number;
}

export interface AppContextType {
	user: User | null;
	favorites: Favorite[] | null;
	universities: University[] | null;
	selectedUniversity: University | null;
	updateUser: (newUser: User | null) => void;
	addFavorite: (universitiId: number) => void;
	removeFavorite: (universitiId: number) => void;
	selectUniversity: (university: University) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
