
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthProvider from './context/AuthContext';
import ToastProvider from './context/ToastContext';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Search from './pages/Search';
import './styles.css';

export function App() {
	return (
		<AuthProvider>
			<ToastProvider>
				<BrowserRouter>
					<div className='mb-2'>
						<Navbar />
					</div>
					<Routes>
						<Route path="/" element={<Search />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/search" element={<Search />} />
						<Route path="/profile/:id" element={<Profile />} />
					</Routes>
				</BrowserRouter>
			</ToastProvider>
		</AuthProvider>
	)
}
