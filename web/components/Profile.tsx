import { useEffect, useState } from 'react'
import { fetchColleges } from '../utils/collegesFetch'
import { Box, Typography } from '@mui/material'
import { College } from './College'
import CollegeDescription from './CollegeDescription'
import { useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
const Profile = () => {
  const [colleges, setColleges] = useState([])
  const [collegeSelected, setcollegeSelected] = useState([])
  const { user } = useSelector((state: any) => state.user)

  if (!user.user) {
    return <Navigate to='/login' replace />
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
      <Box marginRight={5} minWidth={500}>
        <Typography variant='h4'>
          <strong>My Colleges</strong>
        </Typography>
        {user.favorites.length ? (
          colleges
            .filter((college) => user.favorites.find((id) => id === college.id))
            .map((college) => {
              return (
                <College
                  key={college.id}
                  college={college}
                  onClick={() => setcollegeSelected(college)}
                  isFavorite={user.favorites.some(
                    (collegeId) => collegeId === college.id,
                  )}
                />
              )
            })
        ) : (
          <Typography variant='h4' mt={5}>
            <strong>No Colleges added to favorites</strong>
          </Typography>
        )}
      </Box>
      <CollegeDescription college={collegeSelected} />
    </Box>
  )
}

export default Profile
