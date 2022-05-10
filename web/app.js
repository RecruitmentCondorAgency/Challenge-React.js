import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';

export function App() {
	return (
		<BrowserRouter>
			<Navbar/>
			<Routes>
				<Route path='/' element={<HomePage/>}/>
				<Route path="/about" element={<AboutPage/>}/>
				<Route path='/signin' element={<SigninPage/>}/>
				<Route path='/signup' element={<SignupPage/>}/>
				<Route path='/profile' element={<ProfilePage/>}/>
				<Route path='/search' element={<SearchPage/>}/>
				<Route path='*' element={<NotFoundPage/>}/>
			</Routes>			
		</BrowserRouter>
	)
}
