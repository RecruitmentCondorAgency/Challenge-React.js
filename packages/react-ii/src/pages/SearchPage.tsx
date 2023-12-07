import React from 'react';
import { styled } from '@mui/material/styles';
import { Container} from '@mui/material';
import Header from '../components/header';
import Search from '../components/Search';

const StyledRoot = styled('div')(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		display: 'block',
	},
}));
  
const StyledContent = styled('div')(({ theme }) => ({
	maxWidth: '100%',
	margin: 'auto',
	minHeight: '100vh',
	display: 'block',
	//justifyContent: 'center',
	flexDirection: 'column',
	padding: theme.spacing(12, 0),
}));

const SearchPage: React.FC = () => {
	return (
		<StyledRoot>
			<Container maxWidth="sm">
				<StyledContent>
					<Header/>
						<div className='mt-[50px] md:mt-[100px] '> 
					<Search/>
					</div>
				</StyledContent>
			</Container>
		</StyledRoot>
	);
}

export default SearchPage;