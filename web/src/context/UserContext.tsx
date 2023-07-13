import React, {createContext, useEffect, useState} from 'react'
import { User } from '../MyTypes'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { generateError } from '../utils/errors/alerts';
export const UserContext = createContext()

export default function UserContextProvider(props:any) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const URL_API = 'http://localhost:3000/';

    
    useEffect(() => {
        const newuser:(string|null) = localStorage.getItem('user')
        if(!newuser){
            navigate('/login');
        }
        else{
            const data = JSON.parse(newuser);
            setUser(data);
            axios.get(`${URL_API}users?email=${data.email}&password=${data.password}&_limit=1`)
            .then(response=>{
                if(response.data.length===0){
                    console.log('se removera')
                    localStorage.removeItem('user')
                    navigate('/login');
                    return;
                }
            })
            .catch((error)=>{
                console.log(error)
                generateError('Something went wrong with the request')
            })
        }
    }, [])
    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}
