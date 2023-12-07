import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar,Button} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header() {
	const navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();
		sessionStorage.removeItem("uid");
		navigate('/');
	}

	function handleSearch() {
    navigate('/search', { replace: true });
	}

	function handleProfile() {
    navigate('/profile', { replace: true });
	}

  return (
    <header className='bg-white drop-shadow-lg fixed inset-x-0 top-0 w-full z-50 py-4 md:py-6'>
			<div className='auto_container'>
				<div className='flex justify-between items-center'>
					<span>
						<img style={{height: '50px', width:'50px'}} src={logo} alt="" />
					</span>
					<span >
						<Button variant="text" onClick={() => handleSearch()}>
							Search
						</Button>
						<Button variant="text" onClick={() => handleProfile()}>
							Profile
						</Button>
						<Button color="primary" variant="text" onClick={(e) => handleLogout(e)}>
							Logout
						</Button>
					</span>
				</div>
				
			</div>
		</header>
  );
}
