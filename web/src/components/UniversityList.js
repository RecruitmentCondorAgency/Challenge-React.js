import UniversityItem from './UniversityItem';

const UniversityList = ({ universities }) => {
  return (
    <ul>
      {universities.map((university) => (
        <UniversityItem key={university.name} {...university} />
      ))}
    </ul>
  );
};

export default UniversityList;
