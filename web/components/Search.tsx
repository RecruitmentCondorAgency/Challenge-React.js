import { Box, Autocomplete, TextField, Stack, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { fetchColleges } from '../utils/collegesFetch'
import SearchIcon from '@mui/icons-material/Search'
import { College } from './College'
const Search = () => {
  const [colleges, setColleges] = useState([])

  useEffect(() => {
    fetchColleges().then((result) => {
      setColleges(result)
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
            onChange={(e, v) => {
              console.log(v)
            }}
          />
          <IconButton
            disableRipple={true}
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
        {colleges.map((college) => {
          return <College college={college} />
        })}
      </Stack>
    </div>
  )
}

export default Search
