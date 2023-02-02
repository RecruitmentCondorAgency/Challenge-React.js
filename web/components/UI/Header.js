import logo from '../../../graphics/logo.png';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import UserContext from "../../store/user-context";
import {useContext} from "react";

export default function Header() {
    const userCtx = useContext(UserContext)
    const buildMenuOptionClass = isSelected =>
        isSelected ? "block rounded-md bg-blue-50 py-2 pl-3 pr-4 text-base font-medium text-blue-700 dark:bg-gray-900 dark:text-white" :
            "block rounded-md py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"

    const buildLinkClass = isSelected =>
        isSelected ? "block py-2 pl-3 pr-4 rounded dark:text-white text-blue-700 md:p-0" :
            "block py-2 pl-3 pr-4 text-gray-700 rounded hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white"

    const menuOptions = [
        {
            id: 'option_1',
            text: 'Search',
            href: '/search'
        }
    ]

    if (userCtx.isLoggedIn)
        menuOptions.push(
            {
                id: 'option_2',
                text: 'Profile',
                href: '/profile'
            },
            {
                id: 'option_3',
                text: 'Logout',
                href: '/logout'
            }
        )

    return (
        <Disclosure as="nav" className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 shadow">
            {({ open }) => (
                <>
                    <div className="container flex flex-wrap items-center justify-between mx-auto">
                        <a href="https://example.com/" className="flex items-center">
                            <img src={logo} className="h-6 mr-3 sm:h-9" alt="App Logo"/>
                        </a>
                        {/* Mobile menu button */}
                        <Disclosure.Button className="md:hidden inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </Disclosure.Button>
                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
                                {menuOptions.map(option => (
                                    <li key={option.id}>
                                        <a href={option.href}
                                           className={buildLinkClass(false)}
                                           aria-current="page"
                                        >
                                            {option.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 pt-2 pb-4">
                            {menuOptions.map(option => (
                                <Disclosure.Button
                                    as="a"
                                    href={option.href}
                                    className={buildMenuOptionClass(false)}
                                    key={'menu-' + option.id}
                                >
                                    {option.text}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
