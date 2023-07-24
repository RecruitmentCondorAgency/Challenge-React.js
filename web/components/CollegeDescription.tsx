import { Box, Card, CardContent, Typography } from '@mui/material'

const CollegeDescription = ({ college }) => {
  return (
    <Box>
      <Typography variant='h4'>
        <strong>College selected</strong>
      </Typography>
      <Card sx={{ minWidth: 400, minHeight: 500 }}>
        {college ? (
          <CardContent>
            <Box
              sx={{
                width: {
                  xs: 100,
                  sm: 200,
                  md: 500,
                },
              }}
              display='flex'
              flexDirection={'column'}
              justifyContent={'space-between'}>
              <Typography
                variant='h6'
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom>
                {college.name}
              </Typography>
              <Typography
                variant='h6'
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom>
                {college.description}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom>
                Web site: {college.web_page}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom>
                Location: Location
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom>
                Country's capital: Country
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom>
                Currency: $$$
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom>
                Language: US
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom>
                Population: 3000
              </Typography>
            </Box>
          </CardContent>
        ) : (
          <Typography variant='h6'>Select a college</Typography>
        )}
      </Card>
    </Box>
  )
}

export default CollegeDescription
