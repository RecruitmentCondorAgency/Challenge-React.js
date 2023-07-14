import { Box, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../Store/UserSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    let userCredentials = { name, password }
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload.length) {
        setName('')
        setPassword('')
        navigate('/search')
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display='flex'
          flexDirection='column'
          maxWidth={500}
          minWidth={500}
          justifyContent={'center'}
          margin={'auto'}
          marginTop={5}
          padding={3}
          borderRadius={3}
          boxShadow={'5px 5px 10px #ccc'}>
          <TextField
            required
            id='name'
            label='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin='normal'
            type={'text'}
            variant='outlined'
            placeholder='Name'
          />
          <TextField
            required
            id='password'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin='normal'
            type={'password'}
            variant='outlined'
            placeholder='Password'
          />

          <Button
            type='submit'
            sx={{ marginTop: 3 }}
            variant='contained'
            color='primary'>
            Login
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Login
