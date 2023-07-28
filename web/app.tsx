import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { authService } from "./auth/auth.service";
import { User } from "./types";
interface AuthContextType {
  user: User;
  usersAvailable: User[];
  getAllUsers: () => void;
  createNewUser: (newUser: User) => void;
  signout: () => void;
  signIn: (user: User) => void;
}

export let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<User>(null);
  let [usersAvailable, setUsersAvailable] = React.useState<User[]>([]);

  let getAllUsers = async () => {
    const data = await authService.getAllUsers();
    setUsersAvailable(data);
  };

  let createNewUser = async (newUser: User) => {
    const data = await authService.createNewUser(newUser);
    setUser(data)
    await getAllUsers();
  };

  let signIn = (user: User) => {
    setUser(user);
  };

  let signout = async () => {
    setUser(null);
    await getAllUsers();
  };

  let value = { user, usersAvailable, getAllUsers, createNewUser, signIn, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} /> */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}
