import React from 'react';
import UniversityItem from './UniversityItem';

const UniversityList = ({ universities }) => {
  return universities.length > 0 ? (
    <ul>
      {universities.map((university) => (
        <UniversityItem key={university.name} {...university} />
      ))}
    </ul>
  ) : null;
};

export default UniversityList;
