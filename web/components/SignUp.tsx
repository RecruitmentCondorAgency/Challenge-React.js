import { Box, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signUpUser } from '../../Store/UserSlice'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const handleSignUp = (e) => {
    e.preventDefault()
    let userCredentials = { name, password, email }
    dispatch(signUpUser(userCredentials)).then((result) => {
      if (result.payload) {
        setName('')
        setPassword('')
        setEmail('')
        navigate('/login')
      }
    })
  }

  return (
    <div>
      <Box
        onSubmit={handleSignUp}
        component='form'
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
        />
        <TextField
          required
          id='email'
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin='normal'
          type={'email'}
          variant='outlined'
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
        />

        <Button
          type='submit'
          sx={{ marginTop: 3 }}
          variant='contained'
          color='primary'>
          Sign Up
        </Button>
      </Box>
    </div>
  )
}

export default SignUp
