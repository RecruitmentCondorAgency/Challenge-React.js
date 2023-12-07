import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
	return (
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
