import { useState } from 'react';
import '../dist/tailwind.css'
import '../styles.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import { Search } from './components/Search';
import { NotFound } from './components/NotFound';

export function App() {
	
	return (
		<div>
      
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </div>
	
	)
}
