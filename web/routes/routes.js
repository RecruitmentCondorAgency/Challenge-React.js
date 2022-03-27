import * as React from "react";
import { Routes, Route, } from "react-router-dom";
import ErrorBoundary from "src/components/errorBoundary"
import Header from "src/components/header"

const Home = React.lazy(() => import('src/pages/home'));
const Search = React.lazy(() => import('src/pages/search'));
const Login = React.lazy(() => import('src/pages/login'));
const Signup = React.lazy(() => import('src/pages/signup'));
const Profile = React.lazy(() => import('src/pages/profile'));
const Error404 = React.lazy(() => import('src/pages/Error404'));


export default function App(){
	return (
		<div className="bg-light">
			<Header loged="false"/>
			<React.Suspense fallback={<div>Loading…</div>} >
				<ErrorBoundary>
					<Routes>
						<Route path="/" element={<Home/>} />
						<Route path="/search" element={<Search />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="*" element={<Error404/>} />
					</Routes>
				</ErrorBoundary>
			</React.Suspense>
		</div>
	);
}