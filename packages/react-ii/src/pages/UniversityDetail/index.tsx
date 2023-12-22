import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import UniversityItemCard from '../../components/UniversityItemCard';
import UniversityDetailsCard from '../../components/UniversityDetailsCard';
import { useAuth } from '../../contexts/AuthContext';
import { University } from '../../types/university';

const UniversityDetail: React.FC = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(state);

  // Function to handle university selection
  const handleSelectUniversity = useCallback(
    (selected: University) => {
      setSelectedUniversity(selected);
    },
    [setSelectedUniversity]
  );

  // Set the default selected university if none is provided in the state
  useEffect(() => {
    if (!state) {
      setSelectedUniversity(user?.universities?.[0] || null);
    }
  }, [state, user?.universities]);

  return (
    <div className="m-16">
      <div className="flex flex-col-reverse sm:flex-row">
        {/* Section for displaying user's favorite universities */}
        <div className="p-4 min-w-52">
          <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
          {user?.universities ? (
            user?.universities?.map((favoriteUniversity) => (
              <UniversityItemCard
                key={favoriteUniversity.name}
                university={favoriteUniversity}
                onCardSelect={handleSelectUniversity}
                isFavorite={true}
              />
            ))
          ) : (
            <div>No data found</div>
          )}
        </div>

        {/* Section for displaying details of the selected university */}
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-blue-500 ">
            Selected University
          </h2>
          {selectedUniversity && (
            <UniversityDetailsCard university={selectedUniversity} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail;
