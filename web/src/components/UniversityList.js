import UniversityItem from './UniversityItem';
import useFetchUniversities from '../pages/universities/hooks/useFetchUniversities';

const UniversityList = () => {
  const universities = useFetchUniversities();

  return (
    <ul>
      {universities.map((university) => (
        <UniversityItem key={university.name} {...university} />
      ))}
    </ul>
  );
};

export default UniversityList;
