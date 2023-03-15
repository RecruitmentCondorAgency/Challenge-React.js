import "./styles.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./src/pages/login";
import HomePage from "./src/pages";
import NavBar from "./src/components/NavBar";
import ProfilePage from "./src/pages/profile";
import React from "react";
import { atom, useAtom } from "jotai";

export const myFaboritesAtom = atom([]);
export function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
