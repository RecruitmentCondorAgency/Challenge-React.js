import * as React from "react";
import { Routes, Route,useLocation, useNavigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';

import ErrorBoundary from "src/components/errorBoundary"
import Header from "src/components/header"

const Home = React.lazy(() => import('src/pages/home'));
const Search = React.lazy(() => import('src/pages/search'));
const Login = React.lazy(() => import('src/pages/login'));
const Signup = React.lazy(() => import('src/pages/signup'));
const Logout = React.lazy(() => import('src/pages/logout'));
const Profile = React.lazy(() => import('src/pages/profile'));
const Error404 = React.lazy(() => import('src/pages/Error404'));


export default function App(){
	ReactSession.setStoreType("localStorage");
	const location = useLocation();
	const navigate = useNavigate();

	const [session,sessionUpdate] = React.useState(false);

	React.useEffect(() => {
		var userID = ReactSession.get("user.id");
		sessionUpdate(userID);
		if(!userID){
			if(location.pathname=="/profile"){
				navigate("/login");
			}
		}else{
			if(location.pathname=="/login"||location.pathname=="/signup"){
				navigate("/");
			}
		}
	},[location]);

	return (
		<div className="bg-light">
			<Header loged={session}/>
			<React.Suspense fallback={<div>Loading…</div>} >
				<ErrorBoundary>
					<Routes>
						<Route path="/" element={<Home/>} />
						<Route path="/search" element={<Search />} />
						<Route path="/login" element={ session ? <div>Redirecting...</div>:<Login />} />
						<Route path="/signup" element={ session ? <div>Redirecting...</div>:<Signup />} />
						<Route path="/logout" element={ <Logout/> } />
						<Route path="/profile" element={ session ? <Profile />:<div>Redirecting...</div>} />
						<Route path="*" element={<Error404/>} />
					</Routes>
				</ErrorBoundary>
			</React.Suspense>
		</div>
	);
}

