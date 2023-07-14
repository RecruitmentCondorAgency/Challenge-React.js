import { Box, Card, CardContent, Typography, IconButton } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import StarOutlineIcon from '@mui/icons-material/StarOutline'

export const College = ({ college }) => {
  return (
    <Box
      sx={{ marginTop: '20px' }}
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
                disableRipple={true}
                style={{
                  padding: '0',
                  marginBottom: '15px',
                  marginRight: '3px',
                }}>
                <StarOutlineIcon />
              </IconButton>
              <IconButton
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
