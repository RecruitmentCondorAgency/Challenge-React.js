import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { authService } from "./auth/auth.service";
interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  toggle: (callback: VoidFunction, isAuthenticated: boolean) => void;
}

export let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string, callback: VoidFunction) => {
    return authService.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return authService.signout(() => {
      setUser(null);
      callback();
    });
  };

  let toggle = (callback: VoidFunction, isAuthenticated: boolean) => {
    return authService.toggle(() => {
      if (isAuthenticated) {
        setUser(null);
      } else {
        setUser({ email: "smanaure93@gmail.com" });
      }
      callback();
    });
  };

  let value = { user, signin, signout, toggle };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} /> */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
