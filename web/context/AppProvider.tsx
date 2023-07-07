import React, { createContext, useState, ReactNode, useEffect } from "react";
import AppContext, { AppContextType, AppState } from "./AppContext";
import { Favorite, University, User } from '../types/types';
import {
	deleteFavorite,
	getFavorites,
	getUniversities,
	saveFavorite,
} from "../helpers/connexion";

type AppProviderProps = {
	children: ReactNode;
};

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [universities, setUniversities] = useState<University[]>([]);
	const [favorites, setFavorites] = useState<Favorite[] | null>([]);
	const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);


	//Seleccionar una universidad 
	const selectUniversity = (university: University) => {
		setSelectedUniversity(university);
	};

	//Cargar universidades
	useEffect(() => {
		const loadData = async () => {
			const resp = await getUniversities();
			setUniversities(resp);
		};
		loadData();
	}, []);

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

	//Guardar Favorito
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

	//Quitar Favorito
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
		universities,
		selectedUniversity,
		updateUser,
		addFavorite,
		removeFavorite,
		selectUniversity
	};

	return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
