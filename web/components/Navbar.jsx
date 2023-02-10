import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import { Menubar } from 'primereact/menubar'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
	const { user, isAuthenticated, logout } = React.useContext(AuthContext)
	let navigate = useNavigate()

	return (
		<nav>
			<Menubar
				start={
					<Image
						src="https://cdn1.iconfinder.com/data/icons/office-icons-17/512/ilustracoes_04-10-256.png"
						alt="logo"
						width='64px'
						height='64px'
					/>
				}
				end={
					<>
						{isAuthenticated ? (
							<div>
								<Button
									label="Search"
									className="p-button-raised p-button-text p-button-plain mr-6"
									onClick={() => navigate('/search')}
								/>
								<Button
									label="Profile"
									className="p-button-raised p-button-text p-button-plain mr-6"
									onClick={() => navigate(`/profile/${user?.id}`)}
								/>
								<Button
									label="Logout"
									icon="pi pi-power-off"
									className='p-button-danger'
									onClick={() => {
										logout()
										navigate('/')
									}}
								/>
							</div>
						) : (
							<div>
								<Button
									label="Search"
									className="p-button-raised p-button-text p-button-plain mr-6"
									onClick={() => navigate('/search')}
								/>
								<Button
									label="Login"
									icon="pi pi-arrow-right"
									className="p-button-success mr-6"
									onClick={() => navigate('/login')}
								/>
							</div>
						)}
					</>
				}
			/>
		</nav>
	)
}

export default Navbar
