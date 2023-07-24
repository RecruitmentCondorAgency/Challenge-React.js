import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';
import { Provider } from 'react-redux';
import LoginForm from './components/pages/Login';
import Profile  from './components/pages/Profile';
import Search from './components/pages/Search';
import  Navbar  from './components/layouts/Navbar';
import store from './redux/store';
export function App() {
	return (
	<Provider store={store}>
		<Router>
		<Navbar />
		<Routes>
		<Route path="/" element={<LoginForm />} />
		<Route path="/search" element={<Search />} />
		<Route path="/profile" element={<Profile />} />
	    </Routes>
	</Router>
	</Provider>
	);
}
