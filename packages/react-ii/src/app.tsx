import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./Routes";
import Header from "./layout/Header";
import { ToastProvider } from "./contexts/ToastContext";

import "./styles.sass";

export const App = () => (
  <BrowserRouter>
    <ToastProvider>
      <AuthProvider>
        <Header />
        <AppRoutes />
      </AuthProvider>
    </ToastProvider>
  </BrowserRouter>
);
