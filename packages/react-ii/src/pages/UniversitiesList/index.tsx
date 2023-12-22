import { useCallback, useEffect, useState } from "react";

import UniversityListCard from "../../components/UniversityListCard";
import { getUniversitiesAPI, toggleFavoriteStatusAPI } from "../../api/utils";
import { University } from "../../types/university";
import { useAuth } from "../../contexts/AuthContext";
import UniversitiesSearch from "./Search";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useToast } from "../../contexts/ToastContext";
import { toastType } from "../../types/enums";

const UniversitiesList: React.FC = () => {
  const { user, modifyUser } = useAuth();
  const toast = useToast()
  const navigate = useNavigate();
  const [universityData, setUniversityData] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUniversitiesData = useCallback(async (inputValue?: string) => {
    setIsLoading(true);
    const universities = await getUniversitiesAPI(inputValue);
    setIsLoading(false);
    setUniversityData(universities);
  }, []);

  const handleSearch = useCallback(
    (searchTerm: string) => {
      getUniversitiesData(searchTerm);
    },
    [getUniversitiesData]
  );

  useEffect(() => {
    getUniversitiesData();
  }, [getUniversitiesData]);

  const getIsFavorite = useCallback(
    (university: University) => {
      return (
        user?.universities?.findIndex((item) => item.name === university.name) >
        -1
      );
    },
    [user]
  );

  const onFavoriteClick = useCallback(
    async (university: University, isFavorite: boolean) => {
      let newUniversities = [...(user?.universities || [])];
      if (!isFavorite) {
        newUniversities.unshift(university);
      } else {
        newUniversities = newUniversities.filter(
          (item) => item.name !== university.name
        );
      }
      const response = await toggleFavoriteStatusAPI(newUniversities, user?.id?.toString())
      if(response) {
        modifyUser({ ...user, universities: newUniversities });
      } else {
        toast.showToast(toastType.error, 'Something went wrong');
      }
    },
    [user, modifyUser]
  );

  const handleUniversityClick = useCallback((university: University) => {
    navigate("/university-detail", { state: { ...university } });
  }, []);

  return (
    <div className="mx-auto px-4 py-20 max-w-lg">
      <UniversitiesSearch onSearch={handleSearch} />
      <div className="flex flex-col mx-auto">
        {isLoading && <Loader />}
        {universityData?.map((university, index) => (
          <UniversityListCard
            key={university.name}
            university={university}
            onFavoriteClick={onFavoriteClick}
            isFavorite={getIsFavorite(university)}
            onCardSelect={handleUniversityClick}
          />
        ))}
        {!isLoading && !universityData?.length && (
          <div>No University data</div>
        )}
      </div>
    </div>
  );
};

export default UniversitiesList;
