import { ProgressSpinner } from 'primereact/progressspinner';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthProvider from './context/AuthContext';
import ToastProvider from './context/ToastContext';
import './styles.css';

const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));
const Register = lazy(() => import('./pages/Register'));
const Search = lazy(() => import('./pages/Search'));

export function App() {
	return (
		<AuthProvider>
			<ToastProvider>
				<BrowserRouter>
					<div className='mb-2'>
						<Navbar />
					</div>
					<Suspense fallback={<ProgressSpinner />}>
						<Routes>
							<Route path="/" element={<Search />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/search" element={<Search />} />
							<Route path="/profile/:id" element={<Profile />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</ToastProvider>
		</AuthProvider>
	)
}
