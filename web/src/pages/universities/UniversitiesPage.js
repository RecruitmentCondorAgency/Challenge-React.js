import InputSearch from '../../components/search/InputSearch';
import UniversityList from '../../components/UniversityList';
import { UniversityProvider } from '../../lib/contexts/UniversityContext';

const UniversitiesPage = () => {
  return (
    <UniversityProvider>
      <InputSearch />
      <UniversityList />
    </UniversityProvider>
  );
};

export default UniversitiesPage;
