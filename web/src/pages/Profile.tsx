import React, {useContext, useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import styles from '../utils/style';
import { generateError, generateSuccess } from '../utils/errors/alerts';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Country, University } from '../MyTypes';
import axios from 'axios';

export default function Profile() {
    const {user, setUser} = useContext(UserContext)
    const [languages, setLanguages] = useState([])
    const [country, setCountry] = useState<Country>()

    const [loading, setLoading] = useState<boolean>(false)
    const [showData, setShowData] = useState<boolean>(false);
    const [dataSelected, setDataSelected] = useState<University>()
    const {state} = useLocation();
    const navigate = useNavigate();
    const [notyDisplayed, setNotyDisplayed] = useState<boolean>(false);
    const URL_API = 'http://localhost:3000/';
    const URL_API2 = 'https://restcountries.com/v3.1/';
    
    
    useEffect(()=>{
        console.log("USER", user)
        const newuser:(string|null) = localStorage.getItem('user')
        if(!newuser){
            navigate('/login');
        }else{
            const data = JSON.parse(newuser);
            setUser(data);
        }
        
        if (state && state.noty && !notyDisplayed) {
            generateSuccess(state.noty);
            setNotyDisplayed(true);
            
        }
        window.history.replaceState({}, document.title)
        
    }, [])

    const selectUniversity = (university:University)=>{
        setShowData(true)
        axios.get(`${URL_API2}name/${university.country}`).then(response=>{
            console.log(response.data[0])
            setCountry(response.data[0])
            setLanguages(Object.keys(response.data[0].languages));
            setDataSelected(university);
        }).catch(error=>{
            generateError('Error on getting country information')
        });
        

    }
    const deleteUniversity = (university:University)=>{
        console.log(user.universities)
        user.universities = user.universities.filter(uni=>uni!==university)
        console.log(user)
        axios.put(`${URL_API}users/${user.id}`,
            user
        ).then(response =>{
            console.log(response)
            if(response.status === 200){
                generateSuccess('The university was successfully deleted!')
                setUser(response.data)
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        }).catch(error =>{
            console.log(error)
            generateError('Something went wrong')
        })
        
    }
    return (
        <>
                <div className="mt-5 py-8 px-8 max-w-sm ml-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                    <div className="text-center space-y-2 sm:text-left">
                        <div className="space-y-0.5">
                        <p className="text-lg text-black font-semibold">
                            Hi {user.name}!
                        </p>
                        <p className="text-slate-500 font-medium">
                            {user.email}
                        </p>
                        </div>
                    </div>
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mt-10 px-2 mb-9">
                <div className=" flex flex-col items-center justify-center mb-auto">
                    <h1 className={`${styles.heading2} text-[#2563eb]`}>My Favorites</h1>
                    <div className='w-[80%]'>
                        
                    {
                            user.universities?.length===0 ? <h1 className='font-bold text-xl'>Add some Favorites now!</h1>:
                            user.universities?.map((university, i)=>{
                                return (
                                    <div key={i} className=" mb-3 border-2 rounded-md shadow-lg relative flex w-full  p-2 flex-col  bg-transparent bg-clip-border text-gray-700">
                                    <div className="relative mx-0 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pt-0 pb-2 text-gray-700 shadow-none">
                                        <div className="flex w-full flex-col gap-0.5">
                                            <div className="flex items-center justify-between">
                                                <h5 onClick={()=>selectUniversity(university)}  className="hover:text-blue-400 cursor-pointer block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                                {university.name}
                                                <span className='text-sm mx-4'>{university.alpha_two_code}</span>
                                                </h5>
                                                
                                                <div className="5 flex items-center gap-0 cursor-pointer  " onClick={()=>deleteUniversity(university)}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                        className="h-5 w-5 text-yellow-700 hover:text-red-500"
                                                    >
                                                        <path
                                                        fillRule="evenodd"
                                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                        clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                
                                                </div>
                                            </div>
                                            <p className="block font-sans text-base font-light leading-relaxed text-blue-gray-900 antialiased">
                                                Description
                                            </p>
                                        </div>
                                    </div>
                                    
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className=" flex flex-col items-center justify-center mb-auto">
                    <h1 className={`font-semibold xs:text-[38px]  sm:text-[40px] md:text-[40px] text-[30px] text-[#2563eb] `}>Selected University</h1>
                    {
                        showData && dataSelected &&
                        <div className='w-[80%]'>
                        <div className="h-auto p-4 mb-3 border-2 rounded-md shadow-lg relative flex w-full  flex-col  bg-transparent bg-clip-border text-gray-700">
                            <div className="relative mx-0 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pt-0 pb-2 text-gray-700 shadow-none">
                                <div className="flex w-full flex-col gap-0.5">
                                    <div className="flex items-center justify-between">
                                        <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                        {dataSelected?.name}
                                        </h5>
                                    </div>
                                    <p className="block p-2 font-sans text-base font-light leading-relaxed text-blue-gray-900 antialiased">
                                        
                                    </p>
                                    <p className=''>
                                        WebSite: {dataSelected?.web_pages.map((wp, i)=><a href={wp} target="_blank" key={i} className='text-base text-gray-500 mr-2 hover:cursor-pointer hover:text-blue-400'>{wp}</a>)}
                                    </p>
                                    <p className=''>
                                        Location:<span className='text-base text-gray-500'>{dataSelected?.country}</span>
                                    </p>
                                    <p className=''>
                                        Region: <span className='text-base text-gray-500'>{country?.region}</span>
                                    </p>
                                    
                                    <p className=''>
                                        Country's capital: <span className='text-base text-gray-500'>{country?.capital?.map(e=>e)} - {country?.flag}</span>
                                    </p>
                                    
                                    <p className=''>
                                        Language: <span className='text-base text-gray-500'>{country?.languages[languages[0]]}</span>
                                    </p>
                                    <p className=''>
                                        Population: <span className='text-base text-gray-500'>{country?.population}</span>
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                                
                    </div>
                    }
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}
