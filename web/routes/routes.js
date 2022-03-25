import 'src/assets/css/styles.css'
import * as React from "react";
import { Routes, Route, Link, } from "react-router-dom";

const Home = React.lazy(() => import('src/pages/home'));
const Example = React.lazy(() => import('src/pages/example'));

class ErrorBoundary extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = { hasError: false };
	}
  
	static getDerivedStateFromError(error) {    
        // Update state so the next render will show the fallback UI.    
        return { hasError: true };  
    }

    componentDidCatch(error, errorInfo) {   
        // You can also log the error to an error reporting service    
        logErrorToMyService(error, errorInfo);  
    }
	render() {
		if (this.state.hasError) {      // You can render any custom fallback UI      return <h1>Something went wrong.</h1>;    }
			return this.props.children; 
		}
		return this.props.children; 
  }
}

class App extends React.Component {

    render() {
        return (
			<div>
				<header>
					<h1>Welcome Condor University Database</h1>
				</header>
				<React.Suspense fallback={<div>Loading…</div>} >
					<ErrorBoundary>
						<Routes>
							<Route path="/" element={<Home/>} />
							<Route path="/example" element={<Example />} />
						</Routes>
					</ErrorBoundary>
				</React.Suspense>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/example">Example</Link></li>
				</ul>
			</div>
		);
    }
}
  
export default App;
