import React from 'react';
import { styled } from '@mui/material/styles';
import { Container, Box } from '@mui/material';
import Register from '../components/Register';
import PublicHeader from '../components/publicheader';

const StyledRoot = styled('div')(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		display: 'flex',
	},
}));
  
const StyledContent = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	padding: theme.spacing(12, 0),
}));

const RegisterPage: React.FC = () => {
	return (
		<StyledRoot>
			<Container maxWidth="sm">
				<StyledContent>
					<PublicHeader/>
					<Register/>
				</StyledContent>
			</Container>
		</StyledRoot>
	);
}

export default RegisterPage;