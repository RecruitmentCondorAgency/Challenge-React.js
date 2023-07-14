import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { generateError, generateSuccess } from '../utils/errors/alerts';
import { Search, University } from '../MyTypes';
import { UserContext } from '../context/UserContext';

export default function Table() {
    const {user, setUser} = useContext(UserContext)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [data, setData] = useState<University[]>([])
    const [modalData, setModalData] = useState<University[]>([])
    const URL_API:string = 'http://universities.hipolabs.com/';
    const URL_API2:string =  'http://localhost:3000/';
    const [offset, setOffset] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(true)
    const [input, setInput] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const limit=20;

    useEffect(() =>{
        console.log(offset)
        axios.get(`${URL_API}search?offset=${offset}&limit=${limit}`)
        .then(response => {
            console.log(response.data)
            setData(response.data)
            setLoader(false)

        })
        .catch(error => {
            console.log(error)
            generateError('Something went wrong with the request')
        })
        
    },[offset])

    const handleAutosuggest = (name:string) => {
        setInput(name)
        getData(name)
        setShowModal(false)
    }

    const handleChange = (e:any) => {
        const name:string = e.target.value;
        setInput(name)
        if(name.length===0){
            console.log('vacion')
            setShowModal(false)
            getData('')
            return;
        }
        setShowModal(true)
        axios.get(`${URL_API}search?name=${name}&limit=5`)
        .then(response => {
            setModalData(response.data)
        })
        .catch(error => {
            console.log(error)
            generateError('Something went wrong with the request')
        })

    }
    const onSubmit = (e?:any) => {
        e.preventDefault();   
        getData(input)
        
    }

    const getData = (name:string) => {
        axios.get(`${URL_API}search?name=${name}&offset=0&limit=${limit}`)
        .then(response => {
            console.log(response.data)
            setData(response.data)
            setLoader(false)

        })
        .catch(error => {
            console.log(error)
            generateError('Something went wrong with the request')
        })
    }

    const handleTab = (value:number) => {
        if(value === 0){
            setCurrentPage(currentPage-1)
            
            setOffset((currentPage-2)*limit)
        }else{
            setCurrentPage(currentPage+1)
            setOffset((currentPage)*limit)
        }
    }

    const addUniversity = (university:University)=>{
        const newuser = localStorage.getItem('user');
        if(user.id && newuser){
            user.universities.push(university)
            console.log(JSON.stringify(university))
            axios.put(`${URL_API2}users/${user.id}`,
                user
            ).then(response =>{
                console.log(response)
                if(response.status === 200){
                    generateSuccess('The university was successfully added!')
                    setUser(response.data)
                    localStorage.setItem('user', JSON.stringify(response.data));

                }
            }).catch(error =>{
                console.log(error)
                generateError('Something went wrong')
            })
        }else{
            generateError('You need to login first')
        } 
    }

    return (
        <>
            <form className='m-2' onSubmit={onSubmit}>   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                    type="search" 
                    value={input}
                    onChange={handleChange}
                    id="default-search" 
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search..." />
                    <button 
                    type="submit" 
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                </div>
                
            </form>
            {
                showModal &&    
                <div className=" bg-white  z-10 p-4 rounded-xl flex flex-col border justify-center items-center">
                    <dl className="w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                        {
                            modalData.length===0 ? <h1 className='text-black font-bold text-xl'>University not found</h1>
                            :
                            modalData.map((university, i)=>{
                                return (
                                    <div onClick={()=>handleAutosuggest(university.name)} key={i} className="flex flex-col p-3 cursor-pointer">
                                        <dd className="text-lg text-black font-semibold">{university.name}</dd>
                                    </div>
                                )
                            })
                        }
                        
                    </dl>

                </div>
            }
            {/* mostrar modal para inputs */}

            {
                loader ? <h1>Loading...</h1> :
                (<>
                    <div className='flex flex-col gap-4 justify-center items-center my-4'>
                        {
                            data?.map((university,index)=>{
                                return (
                                    <div key={index} className="relative flex w-full max-w-[26rem] border-2 p-2 flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                                        <div className="relative mx-0 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pt-0 pb-2 text-gray-700 shadow-none">
                                            
                                            <div className="flex w-full flex-col gap-0.5">
                                                <div className="flex items-center justify-between">
                                                    <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                                    {university.name}
                                                    </h5>
                                                    <div onClick={()=>addUniversity(university)} className="5 flex items-center gap-0 cursor-pointer">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            aria-hidden="true"
                                                            className="h-5 w-5 text-gray-700 hover:text-yellow-500"
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
                                                    {university.country} - {university.alpha_two_code}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mb-2 p-0">
                                            <div className="font-light leading-relaxed block gap-2  break-all text-inherit antialiased">
                                                {university.web_pages.map((page, i) =>{
                                                    return (<span className=' px-2 py-1 text-xs bg-green-200 border-2 rounded-xl whitespace-nowrap' key={i}>
                                                        {page}
                                                    </span>)
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500">Showing <span className="font-semibold text-gray-900">{currentPage} - {limit}</span> of <span className="font-semibold text-gray-900 ">1000</span></span>
                        <ul className="inline-flex -space-x-px text-sm h-8">
                            
                            {currentPage-1!==0 &&(
                                <>
                                <li>
                                <a  onClick={()=>handleTab(0)} className="flex items-center justify-center px-3 h-8 ml-0  leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ">Previous</a>
                                </li>
                                <li>
                                    <a onClick={()=>handleTab(0)} className={`text-gray-500 bg-white border flex items-center justify-center px-3 h-8  border-gray-300  hover:bg-blue-100 hover:text-blue-700 `}>{currentPage-1}</a>
                                </li>
                                </>)}
                            <li>
                                <a  className={`text-blue-600 border bg-blue-50 flex items-center justify-center px-3 h-8  border-gray-300  hover:bg-blue-100 hover:text-blue-700 `}>{currentPage}</a>
                            </li>
                            <li>
                                <a onClick={()=>handleTab(1)}  className={`text-gray-500 bg-white border flex items-center justify-center px-3 h-8  border-gray-300  hover:bg-blue-100 hover:text-blue-700 `}>{currentPage+1}</a>
                            </li>
                            <li>
                                <a onClick={()=>handleTab(1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
                            </li>
                        </ul>
                    </nav>
                </>)
            }
        </>
    )
}
