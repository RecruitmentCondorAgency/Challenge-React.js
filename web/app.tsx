import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { authService } from "./auth/auth.service";
import { User } from "./types";
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
interface AuthContextType {
  user: User;
  usersAvailable: User[];
  universities: any[];
  getAllUsers: () => void;
  getUserUniversities: () => void;
  saveNewFav: (rawData: any) => void;
  deleteFav: (universityId: number) => void;
  createNewUser: (newUser: User) => void;
  signout: () => void;
  signIn: (user: User) => void;
}

export let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<User>(null);
  let [universities, setUniversities] = React.useState<any>([]);
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

  let signIn = async (user: User) => {
    setUser(user);
    return navigate("/profile");
  };

  let signout = async () => {
    setUser(null);
    setUniversities([]);
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

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
