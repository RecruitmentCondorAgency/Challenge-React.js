import './styles.css'
import { Route, Routes } from 'react-router-dom';

import Login from "./pages/Login";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Layout from "./components/layout/Layout";
import Register from "./pages/Register";
import UserContext from "./store/user-context";
import {useContext} from "react";
import Logout from "./pages/Logout";

export default function App() {
	const userCtx = useContext(UserContext)

	return (
		<Layout>
			<Routes>
				{userCtx.isLoggedIn && (
					<>
						<Route path='/profile' element={<Profile />}/>
						<Route path='/logout' element={<Logout />}/>
						<Route path='*' element={<Search />} />
					</>
				)}

				{!userCtx.isLoggedIn && (
					<>
						<Route path='/search' element={<Search />} />
						<Route path='/register' element={<Register />} />
						<Route path='*' element={<Login />} />
					</>
				)}
			</Routes>
		</Layout>
	)
}
