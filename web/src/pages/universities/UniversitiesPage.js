import React from 'react';
import InputSearch from '../../components/search/InputSearch';
import UniversityList from '../../components/UniversityList';

export const universities = [
  {
    name: 'sdflskdf',
    country: 'ofdsgdfg9',
    description: 'osi9848sdjfasd'
  },
  {
    name: 'sdflskdf',
    country: 'ofdsgdfg9',
    description: 'osi9848sdjfasd'
  },
  {
    name: 'sdflskdf',
    country: 'ofdsgdfg9',
    description: 'osi9848sdjfasd'
  }
];

const UniversitiesPage = () => {
  return (
    <div>
      <InputSearch />
      <UniversityList universities={universities} />
    </div>
  );
};

export default UniversitiesPage;
