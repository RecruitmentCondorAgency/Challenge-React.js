import InputSearch from '../../components/search/InputSearch';
import UniversityList from '../../components/UniversityList';
import useFetchUniversities from '../../hooks/useFetchUniversities';

const UniversitiesPage = () => {
  const universities = useFetchUniversities();

  return (
    <div>
      <InputSearch />
      <UniversityList universities={universities} />
    </div>
  );
};

export default UniversitiesPage;
