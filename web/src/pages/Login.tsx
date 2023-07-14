import React, {useState, useEffect, useContext} from 'react'
import styles from '../utils/style'
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form"
import dotenv from 'dotenv';
import { Link } from 'react-router-dom';
import { Inputs, User } from '../MyTypes';
import { generateError, generateSuccess } from '../utils/errors/alerts';
import { stringify } from 'querystring';
import { UserContext } from '../context/UserContext';
dotenv.config();



export default function Login() {
  const URL_API = 'http://localhost:3000/';
  const {setUser} =useContext(UserContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  
  

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    axios.get(`${URL_API}users?email=${data.email}&password=${data.password}&_limit=1`)
    .then(response=>{
      if(response.data.length===0){
        generateError('That user does not exist')
        return;
      }
      const data:User[] = response.data;
      localStorage.setItem('user', JSON.stringify(data[0]));
      setUser(data[0])
      navigate('/profile',{state:{noty:`Hi ${data[0].name}, You're logged in`}});
    })
    .catch((error)=>{
      console.log(error)
      generateError('Something went wrong with the request')
    })
    setLoading(false)
  }
  useEffect(() => {
    const user:(string|null) = localStorage.getItem('user')
    
    if(user){
        const data = JSON.parse(user);
        axios.get(`${URL_API}users?email=${data.email}&password=${data.password}&_limit=1`)
        .then(response=>{
            if(response.data.length===0){
              localStorage.removeItem('user')
              navigate('/login');
              return;
            }
            const data:User[] = response.data;
    
            localStorage.setItem('user', JSON.stringify(data[0]));
            setUser(data[0]);
            navigate('/profile',{state:{noty:`Hi ${data[0].name}, You're logged in`}});
        })
        .catch((error)=>{
            console.log(error)
            generateError('Something went wrong with the request')
        })
    }
}, [])


  return (
    <>
      <div className='h-auto flex items-center justify-center w-screen overflow-auto'>
        <div className='overflow-hidden p-8 rounded-2xl bg-white border-2 border-gray-200 shadow-md my-5 mx-3 sm:mx-4 w-full md:w-[70%] '>
          <p className={`${styles.sectionSubText}`}>WELCOME</p>
          <h3 className={styles.sectionHeadText}>Log In</h3>
          <form  onSubmit={handleSubmit(onSubmit)} className='mt-12 flex flex-col gap-8'>
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
                
                {loading ? 'Loggin in...':'Login'}
            </button>
          </form>
          <p className="text-sm mt-4 font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <Link to='/register' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
          </p>   
        </div>
        <ToastContainer/>
      </div>
    </>
  )
}
