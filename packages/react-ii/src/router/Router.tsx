import { Outlet, Navigate } from 'react-router-dom'
import { useUserData } from '../store/Auth.store'
import { useEffect } from 'react'

const PrivateRoutes = () => {
    const { data }  = useUserData()
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || data
   
    return(
        userInfo ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
