import React from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import Header from '../components/header';
import Profile from '../components/Profile';

const ProfilePage: React.FC = () => {
	return (
		<div className='w-full h-screen'>
			<Header/>
			<div className='mt-[100px] md:mt-[200px]'> 
				<Profile/>
			</div>
		</div>
	);
}

export default ProfilePage;