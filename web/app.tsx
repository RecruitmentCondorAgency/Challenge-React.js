import Login from './components/Login'
import SignUp from './components/SignUp'
import Search from './components/Search'
import Profile from './components/Profile'

import './styles.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
export function App() {
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <NavBar>
              <Profile />
            </NavBar>
          }>
          <Route path='signup' element={<SignUp />} />
          <Route path='login' element={<Login />} />
          <Route path='search' element={<Search />} />
          <Route path='*' element={<Login />} />
        </Route>
      </Routes>
    </div>
  )
}
