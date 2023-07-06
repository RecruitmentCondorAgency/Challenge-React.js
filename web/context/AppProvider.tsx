import React, { createContext, useState, ReactNode, useEffect } from "react";
import AppContext, { AppContextType, AppState } from "./AppContext";
import { Favorite, User } from "../types/types";
import { deleteFavorite, getFavorites, saveFavorite } from "../helpers/connexion";

type AppProviderProps = {
	children: ReactNode;
};

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [favorites, setFavorites] = useState<Favorite[] | null>([]);

	//Actualizar usuario (login y logout)
	const updateUser = (newUser: User) => {
		setUser(newUser);
	};

	//Copiar Storage a estado
	useEffect(() => {
		const storedUser = localStorage.getItem("universityAppUser");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	// Guardar o elimiar localStorage de estado
	useEffect(() => {
		if (user) {
			localStorage.setItem("universityAppUser", JSON.stringify(user));
		} else {
			localStorage.removeItem("universityAppUser");
		}
	}, [user]);

	//Cargar Favoritos
	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const favoritesData = await getFavorites(user.id);
				setFavorites(favoritesData);
			} catch (error) {
				console.error(error);
			}
		};
		if (user) fetchFavorites();
	}, [user]);

	const addFavorite = (universitiId: number) => {
		const fetchFavorites = async () => {
			try {
				const favoritesData = await saveFavorite(universitiId, user.id);
				setFavorites((prevFavorites) => [...prevFavorites, favoritesData]);
			} catch (error) {
				console.error("Error al cargar los favoritos:", error);
			}
		};
		if (user) fetchFavorites();
	};

	const removeFavorite = (universitiId) => {
		const fetchFavorites = async () => {
			try {
				const resp = await deleteFavorite(universitiId, user.id);
				setFavorites((prevFavorites) =>
					prevFavorites.filter((favorite) => favorite.universityId !== universitiId)
				);
			} catch (error) {
				console.error("Error al cargar los favoritos:", error);
			}
		};
		if (user) fetchFavorites();
	};

	const appContextValue: AppContextType = {
		user,
		favorites,
		updateUser,
		addFavorite,
		removeFavorite,
	};

	return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
