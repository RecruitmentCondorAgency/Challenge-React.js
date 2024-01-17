import { FormEvent, useEffect, useState } from "react"
import useLogin from "./services/login.service"
import useRegister from "./services/register.service"
import { useNavigate } from "react-router-dom"
import { User, UserResponse } from "../../types/user"
import { useUserData } from "../../store/Auth.store"

export const Login = () => {

   const { data: userData, clear, set: setUserData }  = useUserData()
   const { loginUser, loginResponse } = useLogin()
   const { registerUser, registerResponse } = useRegister()
   const navigate = useNavigate()

  const [form, setform] = useState<Omit<User, 'universities'>>({
    email:'',
    password:''
  })
  const [isRegisterForm, setisRegisterForm] = useState(false)

  const handleForm = (e) => {
    setform({
      ...form,
        [e.target.name]: e.target.value  
    })
  }

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    loginUser(form)
  }

  const handleRegister = (e: FormEvent) => {
    e.preventDefault()
    registerUser(form)
  }

  useEffect(() => {
    if(loginResponse.data && !loginResponse.loading && !loginResponse.error) {
      const data = loginResponse.data as UserResponse[]
      
      if(data.length > 0) {
        setUserData(loginResponse.data[0])
        console.log(loginResponse.data[0])
        navigate('/home')
      }
    }
  },[loginResponse])

  useEffect(() => {
    if(registerResponse.data && !loginResponse.loading && !loginResponse.error) {
        setisRegisterForm(false)
    }
  },[registerResponse])

  return (
   
<div className="w-75 md:w-100 h-[100vh] items-center flex justify-center p-8">

<div className="w-full max-w-xl p-4 bg-white  border border-gray-300 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form onSubmit={isRegisterForm ? handleRegister : handleLogin} className="space-y-6" action="#">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">{isRegisterForm ? 'Register in to our platform' : 'Sign in to our platform'}</h5>
      {loginResponse.data && !loginResponse.loading && loginResponse.data.length === 0 ? (
        <p className="text-[red]">Wrong credentials</p>
      ): (<></>)}
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input onChange={handleForm}  value={form.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="student@university.com" required />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input onChange={handleForm} value={form.password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
      
        <button disabled={registerResponse.loading || loginResponse.loading} type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-xl px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isRegisterForm ? 'Register' : 'Login'}</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {isRegisterForm ? 'Already registered?' : 'Not registered?'} <a onClick={() => setisRegisterForm((state) => !state)}  className="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer">{isRegisterForm ? 'Login' : 'Create account'}</a>
        </div>
    </form>
</div>
</div>

  )
}
