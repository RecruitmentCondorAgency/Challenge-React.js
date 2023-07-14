import AppRouter from "./routes/AppRouter";
import { Navbar } from "./components";
import "./styles.css";
import AppProvider from "./context/AppProvider";
import { BrowserRouter as Router } from "react-router-dom";

export function App() {
	return (
		<AppProvider>
			<div className='h-screen'>
				<Router>
					<Navbar />
					<div className='h-full'>
						<AppRouter />
					</div>
				</Router>
			</div>
		</AppProvider>
	);
}
