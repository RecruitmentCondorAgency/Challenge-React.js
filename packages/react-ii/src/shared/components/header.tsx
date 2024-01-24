import { useNavigate } from "react-router-dom"
import { useUserData } from "../../store/Auth.store"
import { useEffect } from "react"

export const Header = () => {
  const {data, clear, set} = useUserData()
  const userData = data || JSON.parse(localStorage.getItem('userInfo'))
  
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login');
    clear()
    localStorage.clear();
    location.reload()
  }

  useEffect(() => {
    if(localStorage.getItem('userInfo')) {
      set(JSON.parse(localStorage.getItem('userInfo')))
    }
  }, [])

  return (
    <header className="h-[80px] flex items-center justify-end shadow-lg w-full">
      <div className="flex justify-end">
        {userData?.email ? (
          <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                  <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li className="cursor-pointer" onClick={() => {navigate('/home')}}>
                      <a  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Search</a>
                    </li>
                    <li className="cursor-pointer" onClick={() => {navigate('/profile')}}>
                      <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</a>
                    </li>
                    <li className="cursor-pointer" onClick={handleLogout}>
                      <a  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <img className="rounded-full" src={`https://ui-avatars.com/api/?name=${userData?.email}`} alt="" />
          </>
        ): (<></>)}
      </div>
    </header>
  )
}
