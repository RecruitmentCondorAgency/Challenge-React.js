import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Flag from 'react-world-flags';

import Card from './Card';

const UniversityCard = ({
  name,
  country,
  countryCode,
  webPages,
  capital,
  currencies,
  languages,
  population,
}) => {
  return (
    <Card>
      <Stack spacing={2}>
        <Typography variant="h6">{name}</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pretium
          eros mauris, in eleifend sapien faucibus vitae. Curabitur mattis leo
          ex, id luctus nisi laoreet viverra. In luctus ex massa, ac pharetra
          purus rutrum eu. Donec eu ante felis. Nunc a porta diam. Sed congue
          volutpat enim, ac bibendum leo tempor vel. Duis est mauris,
          condimentum vitae eleifend rhoncus, porta ac arcu. Duis mattis
          scelerisque odio non vulputate. Curabitur vel sapien felis. Fusce non
          libero pulvinar mi molestie semper. Maecenas consequat odio ultrices
          lectus sagittis, vitae dapibus ex pulvinar. Proin et nisl nisl.
          Quisque dictum, tortor nec finibus ornare, dui diam laoreet eros, in
          feugiat neque libero et quam. Maecenas facilisis condimentum erat id
          tempus. Sed eleifend, metus eu dapibus hendrerit, sapien ligula
          commodo ex, in aliquam sapien justo tincidunt nunc.
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Country: {country}</Typography>
          <Flag code={countryCode} height="16" />
        </Stack>
        <Box>
          <Typography>Web pages:</Typography>
          <List sx={{ p: 0 }}>
            {webPages?.map((link) => (
              <Link
                key={link}
                to={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItem sx={{ py: 0 }}>
                  <ListItemText primary={link} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
        <Typography>Capital: {capital}</Typography>
        <Box>
          <Typography>Currencies: </Typography>
          <List sx={{ p: 0 }}>
            {currencies?.map(({ name, symbol }) => (
              <ListItem sx={{ py: 0 }} key={name}>
                <ListItemText primary={`${name} (${symbol})`} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Typography>Languages:</Typography>
          <List sx={{ p: 0 }}>
            {languages?.map((language) => (
              <ListItem sx={{ py: 0 }} key={language}>
                <ListItemText primary={language} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Typography>Population: {population}</Typography>
      </Stack>
    </Card>
  );
};

UniversityCard.propTypes = {
  name: PropTypes.string,
  country: PropTypes.string,
  countryCode: PropTypes.string,
  webPages: PropTypes.array,
  capital: PropTypes.string,
  currencies: PropTypes.array,
  languages: PropTypes.array,
  population: PropTypes.number,
};

export default UniversityCard;
