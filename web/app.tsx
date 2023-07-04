import AppRouter from "./routes/AppRouter";
import { Navbar } from "./components";
import "./styles.css";
import AppProvider from "./context/AppProvider";

export function App() {
	return (
		<AppProvider>
		<div className='h-screen'>
			<Navbar />
			<div className='h-full'>
				<AppRouter />
			</div>
		</div>
		</AppProvider>
	);
}
