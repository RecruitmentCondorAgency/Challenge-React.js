import { Router } from './router';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'
import { NavBar } from './components/NavBar';

export function App() {
	return (
		<div className="App">
			<NavBar />
			<ToastContainer theme='colored' position='top-center'></ToastContainer>
			<Router />
		</div>
	)
}


