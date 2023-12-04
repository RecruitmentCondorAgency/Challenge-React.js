import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../../assets/logo.png';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';


const navigation = [
	{ name: 'Search', href: '/search', current: true, linkType: 'LOGGED_IN' },
	{ name: 'University', href: '/university', current: false, linkType: 'LOGGED_IN' },
	{ name: 'Register', href: '/register', current: false, linkType: 'ANONYMOUS' },
	{ name: 'Login', href: '/login', current: false, linkType: 'ANONYMOUS' },
	{ name: 'Logout', href: '/logout', current: false, linkType: 'LOGGED_IN' },
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const Header = () => {
	const location = useLocation();
	const user = useAppSelector((state) => state.users)
	return (
		<Disclosure as="nav" className="border border-grey-800 shadow-lg">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 items-center justify-between">
							<div className="flex items-center flex items-center justify-between w-full">
								<div className="flex-shrink-0">
									<img
										className="h-8 w-8"
										src={logo}
										alt="Your Company"
									/>
								</div>
								<div className="hidden md:block">
									<div className="ml-10 flex items-baseline space-x-4">
										{navigation.filter((item) => {
											return item.linkType === 'LOGGED_IN' && user?.user.email || item.linkType === 'ANONYMOUS' && !user?.user.email
										}).map((item) => {
											return {
												...item,
												current: item.href === location.pathname
											}
										}).map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? 'bg-gray-900 text-white'
														: 'text-gray-800 hover:bg-gray-700 hover:text-white',
													'rounded-md px-3 py-2 text-sm font-medium'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
							<div className="-mr-2 flex md:hidden">
								{/* Mobile menu button */}
								<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="md:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
							{navigation.filter((item) => {
								return item.linkType === 'LOGGED_IN' && user?.user.email || item.linkType === 'ANONYMOUS' && !user?.user.email
							}).map((item) => {
								return {
									...item,
									current: item.href === location.pathname
								}
							}).map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-700 hover:text-white',
										'block rounded-md px-3 py-2 text-base font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>

					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}

export default Header;
