import React, {useState, useEffect} from 'react'
import styles from '../utils/style'
import axios from 'axios'
import { useForm, SubmitHandler } from "react-hook-form"
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Inputs } from '../MyTypes'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { generateError, generateSuccess } from '../utils/errors/alerts'
import { User } from '../MyTypes'

export default function Register() {
    const URL_API = 'http://localhost:3000/';
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()
    const [visible, setVisible] = useState<boolean>(false)

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setLoading(true);
        
        data.universities=[]
        axios.post(`${URL_API}users`, data)
        .then((response) => {
            if(response.status===201){
                generateSuccess(`Hi ${data.name}, you can sign in now! Go to Login`)
                reset();
                return;
            }else{
                generateError('Something went wrong with the request')
            }
        })
        .catch((error) => {
            console.log(error)
            generateError('Something went wrong with the request')
        })
        
        setLoading(false)
    }
    return (
        <>
            <div className='h-auto flex items-center justify-center w-screen overflow-auto'>
                <div className='overflow-hidden p-8 rounded-2xl bg-white border-2 border-gray-200 shadow-md my-5 mx-3 sm:mx-4 w-full md:w-[70%] '>
                
                <h3 className={styles.sectionHeadText}>Register</h3>
                <form  onSubmit={handleSubmit(onSubmit)} className='mt-2 flex flex-col gap-8'>
                    <label htmlFor="email" className='flex flex-col'>
                        <span className='font-medium text-black mb-4'>Your name:</span>
                        <input
                        type="name"
                        placeholder="Insert your name" 
                        {...register('name', {
                        required:true,
                        
                    })}
                        className={styles.inputNormal} 
                    />
                    {errors.name?.type === 'required' && <p className={styles.pError}>Field required</p>}
                    
                    </label>
                    <label htmlFor="email" className='flex flex-col'>
                        <span className='font-medium text-black mb-4'>Your Email:</span>
                        <input
                        type="email"
                        placeholder="Insert your email" 
                        {...register('email', {
                        required:true,
                        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    })}
                        className={styles.inputNormal} 
                    />
                    {errors.email?.type === 'required' && <p className={styles.pError}>Field required</p>}
                    {errors.email?.type === 'pattern' && <p className={styles.pError}>Enter a valid email</p>}  
                    </label>
                    
                    <label htmlFor="password" className='flex flex-col'>
                        <span className='text-black font-medium mb-4 flex gap-2'>Your Password: {!visible?<FaEye size={20} onClick={()=>setVisible(!visible)}/>: <FaEyeSlash size={20} onClick={()=>setVisible(!visible)}/>}</span>
                        
                    <input
                        
                        type={visible?'text':'password'} 
                        placeholder="Insert your password here" 
                        {...register('password',{
                        required:true
                        })}
                        className={styles.inputNormal}
                        />
                        {errors.password?.type==='required' && <p className={styles.pError}>Enter a valid password!</p>}
                    </label>
                    
                    
                    
                    <button 
                        type='submit'
                        disabled={loading}
                        
                        className={`bg-black py-3 px-8 outline-none w-full text-white font-bold shadow-md shadow-primary rounded-xl`}>
                        
                        {loading ? 'Signin in...':'Sign up'}
                    </button>
                </form>
                </div>
                <ToastContainer/>
            </div>
            </>
    )
}
