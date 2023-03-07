import React, { useEffect} from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";

import './index.css'

import logo from '../../assets/img/logo.png'

function Header( props ) {
    let navigate = useNavigate()
    let location = useLocation()

    useEffect(() => {
        if(!localStorage.getItem('id')){
            if(!location.pathname === "/register" || !location.pathname === "/"){
                navigate("/")
            }
        }
    }, [])

    const logout = () => {
        localStorage.clear()
        navigate("/")
    }

  return (
    <div className='Header__container'>
        <div className='Header__items-box'>
            <img src={logo} alt="Logo" className='Header__logo'/>
            <ul className='Header__pages'>
                { props.logged 
                    ? 
                    (<>
                        <li>Bienvenido, {localStorage.getItem('name')}</li>
                        <li><Link to={`/search`} className="Header__link">Search</Link></li>
                        <li><Link to={`/profile`} className="Header__link">Profile</Link></li>
                        <li onClick={logout} className="Header__link">Logout</li>
                    </>)
                    : 
                    <>
                        <li><Link to={`/`} className="Header__link">Login</Link></li>
                        <li><Link to={`/register`} className="Header__link">Register</Link></li>
                    </>
                }
            </ul>
        </div>
    </div>
  )
}

export default Header