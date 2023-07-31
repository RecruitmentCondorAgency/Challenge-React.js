import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./providers/auth.provider";


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
