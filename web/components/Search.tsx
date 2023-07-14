import { Box, Autocomplete, TextField, Stack, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { fetchColleges } from '../utils/collegesFetch'
import SearchIcon from '@mui/icons-material/Search'
import { College } from './College'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const [colleges, setColleges] = useState([])
  const [collegesFiltered, setcollegesFiltered] = useState([])
  const navigate = useNavigate()
  const { user } = useSelector((state: any) => state.user)

  if (!user.user) {
    navigate('/login')
  }

  useEffect(() => {
    fetchColleges().then((result) => {
      setColleges(result)
      setcollegesFiltered(result)
    })
  }, [])

  return (
    <div>
      <Stack sx={{ width: 400, margin: 'auto' }}>
        <Box
          sx={{ marginTop: '50px' }}
          display='flex'
          justifyContent={'space-between'}>
          <Autocomplete
            noOptionsText={'No Colleges Found'}
            disablePortal
            id='colleges'
            getOptionLabel={(colleges) => colleges.name}
            options={colleges}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label='Search Colleges' />
            )}
            onChange={(e, value) => {
              if (!value) return setcollegesFiltered(colleges)
              setcollegesFiltered([value])
            }}
          />
          <IconButton
            disableRipple={true}
            // style into variable
            style={{
              color: 'white',
              width: '60px',
              height: 'auto',
              borderRadius: '5px 5px 5px 5px',
              boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#1976d2',
            }}>
            <SearchIcon />
          </IconButton>
        </Box>
        {collegesFiltered.map((college) => {
          return (
            <College
              key={college.id}
              college={college}
              isFavorite={user.favorites.some(
                (collegeId) => collegeId === college.id,
              )}
            />
          )
        })}
      </Stack>
    </div>
  )
}

export default Search
