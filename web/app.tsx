import AppRouter from "./routes/AppRouter.jsx";
import Navbar from "./components/Navbar.jsx";
import "./styles.css";

export function App() {
	return (
		<>
			<Navbar />
			<AppRouter />
		</>
	);
}
