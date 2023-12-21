import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import UniversityListCard from "../../components/UniversityListCard";
import UniversityDetailsCard from "../../components/UniversityDetailsCard";
import { useAuth } from "../../contexts/AuthContext";
import { University } from "../../types/university";

const UniversityDetail: React.FC = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(state);

  const handleSelectUniversity = useCallback(
    (item: University) => {
      setSelectedUniversity(item);
    },
    [setSelectedUniversity]
  );

  useEffect(() => {
    if (!selectedUniversity) {
      setSelectedUniversity(user?.universities?.[0]);
    }
  }, [user?.universities]);

  return (
    <div className="m-16">
      <div className="flex flex-col-reverse sm:flex-row">
        {user?.universities?.length ? (
          <div className="p-4 flex flex-col flex-1 max-w-screen-sm">
            <h2 className="text-2xl font-bold mb-4 text-blue-500">My Favorites</h2>
            {user?.universities?.map((item) => (
              <UniversityListCard
                key={item.name}
                university={item}
                onCardSelect={handleSelectUniversity}
                isFavorite={true}
              />
            ))}
          </div>
        ) : null}
        {selectedUniversity && (
          <div className="p-4 flex flex-col flex-1 max-w-screen-sm">
            <h2 className="text-2xl font-bold mb-4 text-blue-500">Selected University</h2>
            {selectedUniversity && (
              <UniversityDetailsCard university={selectedUniversity} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityDetail;
