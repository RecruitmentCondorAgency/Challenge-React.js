import * as React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services";
import { User } from "../types";

interface AuthContextType {
  user: User;
  usersAvailable: User[];
  universities: any[];
  universitiesFull: any[];
  getAllUsers: () => void;
  getUserUniversities: () => void;
  saveNewFav: (rawData: any) => void;
  deleteFav: (universityId: number) => void;
  createNewUser: (newUser: User) => void;
  signout: () => void;
  signIn: (user: User, shouldRedirect?: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const localStorageUser = localStorage.getItem("logged");

  let [user, setUser] = React.useState<User>(
    JSON.parse(localStorageUser) || null
  );
  let [universities, setUniversities] = React.useState<any>([]);
  let [universitiesFull, setUniversitiesFull] = React.useState<any>([]);
  let [usersAvailable, setUsersAvailable] = React.useState<User[]>([]);

  React.useEffect(() => {
    getUserUniversities();
  }, [user]);

  const navigate = useNavigate();

  let getAllUsers = async () => {
    const data = await authService.getAllUsers();
    setUsersAvailable(data);
  };

  let createNewUser = async (newUser: User) => {
    const data = await authService.createNewUser(newUser);
    setUser(data);
    await getAllUsers();
  };

  let signIn = async (user: User, shouldRedirect = true) => {
    setUser(user);
    localStorage.setItem("logged", JSON.stringify(user));
    if (shouldRedirect) return navigate("/profile");
  };

  let signout = async () => {
    setUser(null);
    setUniversities([]);
    localStorage.removeItem("logged");
    await getAllUsers();
    return navigate("/login");
  };

  let getUserUniversities = async () => {
    if (user !== null) {
      const universitiesFromDB = await authService.getUserUniversities(user.id);
      const universityName = [];
      universitiesFromDB.universities.forEach((u) => {
        universityName.push(u.name);
      });
      setUniversities(universityName);
      setUniversitiesFull(universitiesFromDB.universities);
    } else {
      setUniversities([]);
    }
  };

  let saveNewFav = async (rawData: any) => {
    await authService.saveNewFav(rawData);
    await getUserUniversities();
  };
  
  let deleteFav = async (universityId: number) => {
    await authService.deleteFav(universityId);
    await getUserUniversities();
  };

  let value = {
    user,
    usersAvailable,
    universities,
    universitiesFull,
    getUserUniversities,
    getAllUsers,
    createNewUser,
    saveNewFav,
    deleteFav,
    signIn,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
