import './styles.css'
import { Route, Routes, Navigate } from 'react-router-dom';

import Login from "./pages/Login";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Layout from "./components/layout/Layout";

export default function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/login' element={<Login />} />
				<Route path='/search' element={<Search />} />
				<Route path='/profile' element={<Profile />}/>
				<Route path='*' element={<Login />} />
			</Routes>
		</Layout>
	)
}
