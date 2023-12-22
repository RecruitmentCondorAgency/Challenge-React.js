import { ReactNode, useCallback } from 'react';
import { FaStar } from 'react-icons/fa';

import { University } from '../../types/university';

// Props for the UniversityItemCard component
interface UniversityItemCardProps {
  onFavoriteClick?: (university: University, isFavorite: boolean) => void;
  onCardSelect?: (university: University) => void;
  children?: ReactNode;
  university: University;
  isFavorite: boolean;
}

// UniversityItemCard component for displaying details of a university item
const UniversityItemCard: React.FC<UniversityItemCardProps> = ({
  university,
  onFavoriteClick,
  isFavorite,
  children,
  onCardSelect,
}) => {
  const { country, name } = university;

  // Handle favorite icon click
  const handleFavoriteClick = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (onFavoriteClick) {
        onFavoriteClick(university, isFavorite);
      }
    },
    [onFavoriteClick, university, isFavorite]
  );

  // Handle card click
  const handleCardSelect = useCallback(() => {
    if (onCardSelect) {
      onCardSelect(university);
    }
  }, [university, onCardSelect]);

  return (
    <div
      className="max-w-lg rounded overflow-hidden shadow-lg bg-white mb-4 cursor-pointer"
      onClick={handleCardSelect}
    >
      <div className="px-6 py-4">
        {/* University name, country, and favorite icon */}
        <div className="flex justify-between items-center mb-2 mt-2">
          <div>
            <span className="font-bold text-m mr-4">{name} </span>
            <span className="text-slate-400 mr-4">{country}</span>
          </div>
          <div className="flex space-x-2">
            {/* Favorite icon */}
            <FaStar
              style={{ color: isFavorite ? 'rgb(59 130 246)' : 'gray' }}
              className={`cursor-pointer text-red-500 `}
              onClick={handleFavoriteClick}
            />
          </div>
        </div>
        {/* University description */}
        <p className="text-slate-400 text-gray-700 text-base">
          {"We'd like to see a proposal to enrich this module"}
        </p>
      </div>
      {/* Additional content (if any) */}
      {children && <div className="px-6 py-4">{children}</div>}
    </div>
  );
};

export default UniversityItemCard;
