import { AppBar, Toolbar, IconButton, Stack, Button, Box } from '@mui/material'
import MenuIcon from '../../graphics/logo.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../Store/UserSlice'
const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state: any) => state.user)
  const logout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <>
      {user.user && (
        <AppBar position='static'>
          <Toolbar sx={{ bgcolor: '#fff' }}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              size='small'>
              <img src={MenuIcon} alt='logo' style={{ width: '30px' }} />
            </IconButton>
            <Stack direction='row' spacing={2}>
              <Box display={'flex'} justifyContent={'end'}>
                <Button>
                  <Link to='Search'>Search</Link>
                </Button>
                <Button>
                  <Link to='/'>Profile</Link>
                </Button>
                <Button onClick={logout}>Logout</Button>
              </Box>
            </Stack>
          </Toolbar>
        </AppBar>
      )}

      <Outlet />
    </>
  )
}

export default NavBar
