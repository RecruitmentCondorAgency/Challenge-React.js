import React, { useCallback, useEffect, useState } from 'react';

import UniversityItemCard from '../../components/UniversityItemCard';
import { getUniversitiesAPI, toggleFavoriteStatusAPI } from '../../api/utils';
import { University } from '../../types/university';
import { useAuth } from '../../contexts/AuthContext';
import UniversitiesSearch from './Search';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useToast } from '../../contexts/ToastContext';
import { toastType } from '../../types/enums';

const UniversitiesList: React.FC = () => {
  const { user, modifyUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [universityData, setUniversityData] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUniversitiesData = useCallback(async (inputValue?: string) => {
    setIsLoading(true);
    const universities = await getUniversitiesAPI(inputValue);
    setIsLoading(false);
    setUniversityData(universities);
  }, []);

  const handleSearch = useCallback(
    (searchTerm: string) => {
      fetchUniversitiesData(searchTerm);
    },
    [fetchUniversitiesData]
  );

  useEffect(() => {
    fetchUniversitiesData();
  }, [fetchUniversitiesData]);

  const isFavorite = useCallback(
    (university: University) => {
      return (
        user?.universities?.some((item) => item.name === university.name) ||
        false
      );
    },
    [user]
  );

  const handleFavoriteClick = useCallback(
    async (university: University, isFavorite: boolean) => {
      let newUniversities = isFavorite
        ? user?.universities?.filter((item) => item.name !== university.name) ||
          []
        : [university, ...(user?.universities || [])];

      const response = await toggleFavoriteStatusAPI(
        newUniversities,
        user?.id?.toString()
      );

      if (response) {
        modifyUser({ ...user, universities: newUniversities });
      } else {
        toast.showToast(toastType.error, 'Something went wrong');
      }
    },
    [user, modifyUser, toast]
  );

  const handleUniversityClick = useCallback(
    (university: University) => {
      navigate('/detail', { state: { ...university } });
    },
    [navigate]
  );

  return (
    <div className="mx-auto px-4 py-20 max-w-lg">
      <UniversitiesSearch onSearch={handleSearch} />
      <div className="flex flex-col mx-auto">
        {isLoading && <Loader />}
        {universityData?.map((university, index) => (
          <UniversityItemCard
            key={index}
            university={university}
            onFavoriteClick={handleFavoriteClick}
            isFavorite={isFavorite(university)}
            onCardSelect={handleUniversityClick}
          />
        ))}
        {!isLoading && !universityData?.length && (
          <div className="flex justify-center">No Data found</div>
        )}
      </div>
    </div>
  );
};

export default UniversitiesList;
