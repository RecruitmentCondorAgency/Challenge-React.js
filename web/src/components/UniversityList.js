import UniversityItem from './universityItem/UniversityItem';

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
