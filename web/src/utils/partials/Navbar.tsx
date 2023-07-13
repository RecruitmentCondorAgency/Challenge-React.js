import React, {useContext, useEffect, useState} from 'react'
import menu from '../../../../graphics/menu.svg'
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../../graphics/logo.png'
import { CiMenuFries } from "react-icons/ci";
import { UserContext } from '../../context/UserContext';

export default function Navbar() {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const ROUTES = [
        {
            id:1,
            name:'Profile',
            path:'/profile'
            
        },
        {
            id:2,
            name:'Search',
            path:'/search'

        },
    ]
    const [toggle, setToggle] = useState(false)
    const onLogout = () =>{
        console.log(user)
        if(user.id){
            localStorage.removeItem('user');
        }
        navigate('/login')
    }
    
    return (
        <>
            <nav className="bg-white border-b-2 shadow-sm ">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <div className='lg:hidden flex flex-1 justify-end items-center text-black'> 
                            <CiMenuFries onClick={()=> setToggle(!toggle)} className='mx-2 w-[28px] h-[28px] object-contain cursor-pointer text-black'/>
                            
                        </div>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Link to='/'><img className="block h-8 w-auto " src={logo} alt="Your Company"/>
                                </Link>
                                
                            </div>
                            
                        </div>
                        <div className="relative ml-3 hidden sm:ml-6 sm:flex gap-6">
                            <Link  to='/search' className={` hover:bg-blue-500  hover:text-white rounded-md px-3 text-gray-700 py-2 text-md font-medium`}>Search</Link>
                            {user.id &&<Link  to='/profile' className={` hover:bg-blue-500  hover:text-white rounded-md px-3 text-gray-700 py-2 text-md font-medium`}>Profile</Link>}
                            <a onClick={onLogout} className={` cursor-pointer hover:bg-blue-500  hover:text-white rounded-md px-3 text-gray-700 py-2 text-md font-medium`}>{user.id? 'Logout' : 'Login'}</a>
                        </div>
                    </div>
                </div>

                <div className={`${!toggle ? 'hidden': 'flex'} sm:hidden`} id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <Link  to='/search' className={` hover:bg-blue-500  hover:text-white rounded-md px-3 text-gray-700 py-2 text-md font-medium`}>Search</Link>
                        {user.id &&<Link  to='/profile' className={` hover:bg-blue-500  hover:text-white rounded-md px-3 text-gray-700 py-2 text-md font-medium`}>Profile</Link>}
                        <a onClick={onLogout}  className={` hover:bg-blue-500  hover:text-white rounded-md px-3 text-gray-700 py-2 text-md font-medium`}>{user.id? 'Logout' : 'Login'}</a>
                        
                    </div>
                </div>
            </nav>
        </>
    )
}
