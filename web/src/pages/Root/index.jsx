import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

export default function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [])

  return (
    <Box>
        <Header/>
        <Outlet/>
    </Box>
  )
}
