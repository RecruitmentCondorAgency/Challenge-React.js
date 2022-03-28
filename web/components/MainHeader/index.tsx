import { Fragment } from "react"
import { UserCircleIcon, PencilIcon, SearchIcon, LogoutIcon } from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'
import { store } from "../../store"
import { setUser } from "../../store/user"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/user/selects"
import { toast } from "react-toastify"
import logo from '../../assets/img/logo.png'
import './MainHeader.scss'

const Header = () => {
  const navigate = useNavigate()
  const actualUser = useSelector(selectUser)

  const logout = () => {
    store.dispatch(setUser(null))
  }

  const profile = () => {
    navigate('/profile')
  }

  const search = () => {
    navigate('/home')
  }
 
  return (
    <header className="flex justify-between items-center flex-wrap slate-500 w-100 md:px-8 px-3 py-5 border-b-2 border-slate-200 main-header">
      <div className="flex justify-end items-center flex-wrap main-header__title">
        <img src={logo} alt="logo" />
        <h1 className="text-gray-400 md:text-sm-header sm:text-xs-header text-xs-header">Condor Agency</h1>
      </div>
      <Menu as="div">
        <div>
          <Menu.Button className="appearance-none main-header__menu-btn border-0 rounded-full flex items-center justify-center">
            <div className="w-full h-full rounded-full" style={{overflow: 'hidden'}}>
            {
              actualUser && actualUser.avatar?
                <img src={actualUser.avatar} alt="user-avatar" /> :
                <UserCircleIcon className="text-blue-700"/>
            }
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-5 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <CustomMenuItem onClick={profile}>
                  {(active: boolean) => (<><PencilIcon className={`${active? 'text-white': 'text-blue-700'} w-5 h-5 mr-2`}/> Profile</>)}
                </CustomMenuItem>
                <CustomMenuItem onClick={search}>
                  {(active: boolean) => (<><SearchIcon className={`${active? 'text-white': 'text-blue-700'} w-5 h-5 mr-2`}/> Search</>)}
                </CustomMenuItem>
                <CustomMenuItem onClick={logout}>
                  {(active: boolean) => (<><LogoutIcon className={`${active? 'text-white': 'text-blue-700'} w-5 h-5 mr-2`}/> Logout</>)}
                </CustomMenuItem>
              </div>
            </Menu.Items>
          </Transition>
      </Menu>
    </header>
  )
}

const CustomMenuItem = (props: any) => (
  <Menu.Item>
    {({active}) => (
      <button {...props} 
      className={`${
        active ? 'bg-blue-700 text-white' : 'text-gray-900'
      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
      >
        {props.children(active)}
      </button>
    )}
  </Menu.Item>
)

export default Header