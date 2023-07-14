import { useEffect, useState } from 'react'
import { fetchColleges } from '../utils/collegesFetch'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { College } from './College'
import CollegeDescription from './CollegeDescription'
const Profile = () => {
  const [colleges, setColleges] = useState([])
  const [collegeSelected, setcollegeSelected] = useState([])

  useEffect(() => {
    fetchColleges().then((result) => {
      setColleges(result)
    })
  }, [])

  return (
    <Box
      display='flex'
      maxWidth={500}
      minWidth={500}
      justifyContent={'space-between'}
      margin={'auto'}
      marginTop={5}
      padding={3}
      borderRadius={3}>
      <Box marginRight={5}>
        <Typography variant='h4'>
          <strong>My Colleges</strong>
        </Typography>
        {colleges.map((college) => {
          return (
            <College
              key={college.id}
              college={college}
              onClick={() => setcollegeSelected(college)}
            />
          )
        })}
      </Box>
      <CollegeDescription college={collegeSelected} />
    </Box>
  )
}

export default Profile
