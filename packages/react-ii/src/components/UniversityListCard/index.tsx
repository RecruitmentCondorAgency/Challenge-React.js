import { ReactNode, useCallback } from "react";
import { FaStar } from "react-icons/fa";

import { University } from "../../types/university";

interface UniversityListCardProps {
  onFavoriteClick?: (university: University, isFavorite: boolean) => void;
  onCardSelect?: (University: University) => void;
  children?: ReactNode;
  university: University;
  isFavorite: boolean;
}

const UniversityListCard: React.FC<UniversityListCardProps> = ({
  university,
  onFavoriteClick,
  isFavorite,
  children,
  onCardSelect,
}) => {
  const { country, name } = university;

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

  const handleCardSelect = useCallback(() => {
    if (onCardSelect) {
      onCardSelect(university);
    }
  }, [university, onCardSelect]);

  return (
    <div
      className="rounded overflow-hidden shadow-lg bg-white mb-4 cursor-pointer"
      onClick={handleCardSelect}
    >
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2 mt-2">
          <div>
            <span className="font-bold text-md mr-4">{name}</span>
            <span className="text-slate-400 mr-4">{country}</span>
          </div>
          <div className="flex space-x-2">
            <FaStar
              style={{ color: isFavorite ? "yellow" : "gray" }}
              size="20px"
              className="cursor-pointer text-red-500"
              onClick={handleFavoriteClick}
            />
          </div>
        </div>
        <p className="text-slate-400 text-gray-700 text-base">
          {"We'd like to see a proposal to enrich this module"}
        </p>
      </div>
      {children && <div className="px-6 py-4">{children}</div>}
    </div>
  );
};

export default UniversityListCard;
