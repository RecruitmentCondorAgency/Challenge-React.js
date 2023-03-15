import React from 'react';
import PropTypes from 'prop-types';
import Flag from 'react-world-flags';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LinkIcon from '@mui/icons-material/Link';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useSelector } from 'react-redux';

import { useUpdateUserMutation } from '../redux/services/user';
import Card from './Card';

const UniversityItem = ({
  name,
  country,
  countryCode,
  isFavorite,
  webPages,
}) => {
  const [updateUser, { isLoading, isSuccess, error, isError }] =
    useUpdateUserMutation();
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();

  const handleOpenNewTab = () =>
    window.open(`${process.env.APP_URL}/university/${name}`, '_blank');
  const handleFavoriteClick = () => {
    let universities = [];
    if (user.universities.includes(name)) {
      universities = user.universities.filter((item) => item !== name);
    } else {
      universities = [...user.universities, name];
    }
    updateUser({ id: user.id, body: { universities } });
  };

  return (
    <Card>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Box
            onClick={() => navigate(`/university/${name}`)}
            sx={{
              cursor: 'pointer',
            }}
          >
            <Typography>{name}</Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ color: 'text.disabled' }}>{country}</Typography>
            <Flag code={countryCode} height="16" />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1}>
          {webPages.map((link) => (
            <Link
              key={link}
              to={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon />
            </Link>
          ))}
          {isFavorite ? (
            <StarIcon onClick={handleFavoriteClick} />
          ) : (
            <StarOutlineIcon onClick={handleFavoriteClick} />
          )}
          <OpenInNewIcon
            sx={{ cursor: 'pointer' }}
            onClick={handleOpenNewTab}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

const UniversityList = ({ universities }) => {
  return (
    <Stack spacing={2}>
      {universities.map((university) => (
        <UniversityItem
          key={`university-item-${university.uuid}`}
          {...university}
        />
      ))}
    </Stack>
  );
};

UniversityItem.propTypes = {
  name: PropTypes.string,
  country: PropTypes.string,
  countryCode: PropTypes.string,
  isFavorite: PropTypes.bool,
  webPages: PropTypes.array,
};

UniversityList.propTypes = {
  universities: PropTypes.array,
};

export default UniversityList;
