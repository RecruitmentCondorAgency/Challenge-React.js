import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";



export default function Table() {
    return (
        <>
            <form className='m-2'>   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search..." required/>
                    <button 
                    type="submit" 
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                </div>
            </form>
            {/* mostrar modal para inputs */}
            <div className='flex flex-col gap-4 justify-center items-center my-4'>
            <div className="relative flex w-full max-w-[26rem] border-2 p-2 flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                <div className="relative mx-0 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pt-0 pb-8 text-gray-700 shadow-none">
                    
                    <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                        <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        University Name
                        </h5>
                        <div className="5 flex items-center gap-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-700"
                        >
                            <path
                            fill-rule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clip-rule="evenodd"
                            ></path>
                        </svg>
                        
                        </div>
                    </div>
                    <p className="block font-sans text-base font-light leading-relaxed text-blue-gray-900 antialiased">
                        Frontend Lead @ Google
                    </p>
                    </div>
                </div>
                <div className="mb-6 p-0">
                    <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    Descripcion de la universidad
                    </p>
                </div>
            </div>
            <div className="relative flex w-full max-w-[26rem] border-2 p-2 flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                <div className="relative mx-0 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pt-0 pb-8 text-gray-700 shadow-none">
                    
                    <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                        <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        University Name
                        </h5>
                        <div className="5 flex items-center gap-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-700"
                        >
                            <path
                            fill-rule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clip-rule="evenodd"
                            ></path>
                        </svg>
                        
                        </div>
                    </div>
                    <p className="block font-sans text-base font-light leading-relaxed text-blue-gray-900 antialiased">
                        Frontend Lead @ Google
                    </p>
                    </div>
                </div>
                <div className="mb-6 p-0">
                    <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    Descripcion de la universidad
                    </p>
                </div>
            </div>
            </div>
        </>
    )
}
