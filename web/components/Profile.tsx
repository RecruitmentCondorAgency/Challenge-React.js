import { useEffect, useState } from 'react'
import { fetchColleges } from '../utils/collegesFetch'
import { Box, Typography } from '@mui/material'
import { College } from './College'
import CollegeDescription from './CollegeDescription'
import { useSelector } from 'react-redux'
import { red } from '@mui/material/colors'
import { redirect } from 'react-router-dom'
const Profile = () => {
  const [colleges, setColleges] = useState([])
  const [collegeSelected, setcollegeSelected] = useState([])
  const { user } = useSelector((state: any) => state.user)

  if (!user) {
    return redirect('/login')
  }

  useEffect(() => {
    fetchColleges().then((result) => {
      setColleges(result)
    })
  }, [])

  return (
    <Box
      display='flex'
      justifyItems={'center'}
      maxWidth={500}
      justifyContent={'center'}
      margin={'auto'}
      marginTop={5}
      padding={3}
      borderRadius={3}>
      <Box marginRight={5}>
        <Typography variant='h4'>
          <strong>My Colleges</strong>
        </Typography>
        {user.favorites &&
          colleges
            .filter((college) => user.favorites.find((id) => id === college.id))
            .map((college) => {
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
