import { Box, Card, CardContent, Typography, IconButton } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { favoriteCollege } from '../../Store/UserSlice'
import { useDispatch } from 'react-redux'

export const College = ({ college, isFavorite, onClick }) => {
  const dispatch = useDispatch()

  const handleFavorite = (e) => {
    e.preventDefault()
    dispatch(favoriteCollege(college.id))
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        marginTop: '20px',
        cursor: 'pointer',
        width: {
          xs: 100,
          sm: 200,
          md: 400,
        },
      }}
      display='flex'
      flexDirection='column'
      justifyContent={'center'}>
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <Box display='flex' justifyContent={'space-between'}>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom>
              <strong>{college.name}</strong>
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom>
              {college.country}
            </Typography>
            <Box display='flex' justifyContent={'end'}>
              <IconButton
                onClick={handleFavorite}
                disableRipple={true}
                style={{
                  padding: '0',
                  marginBottom: '15px',
                  marginRight: '3px',
                  color: isFavorite ? '#e5b90a' : 'black',
                }}>
                <StarOutlineIcon />
              </IconButton>
              <IconButton
                target='_blank'
                href={college.web_page}
                disableRipple={true}
                style={{ padding: '0', marginBottom: '15px' }}>
                <OpenInNewIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            Word of the Day Word of the Day
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
