import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import { generateSuccess } from '../utils/errors/alerts';
import { ToastContainer } from 'react-toastify';


export default function Profile() {
    const {state} = useLocation();
    const [notyDisplayed, setNotyDisplayed] = useState(false);

    useEffect(()=>{
        
        if (state && state.noty && !notyDisplayed) {
            generateSuccess(state.noty);
            setNotyDisplayed(true);
            
        }
        window.history.replaceState({}, document.title)
        
    }, [])
    return (
        <>
            <ToastContainer/>
        </>
    )
}
