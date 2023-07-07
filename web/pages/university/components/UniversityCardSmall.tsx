import React, { useContext } from "react";
import { University, Favorite } from "../../../types/types";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { LuExternalLink } from "react-icons/lu";
import AppContext from "../../../context/AppContext";

interface Props {
	university: University;
}

const UniversityCardSmall: React.FC<Props> = ({ university }) => {
	const { favorites, addFavorite, removeFavorite, selectUniversity } =
		useContext(AppContext);

	const isFavorite = favorites.some(
		(favorite: Favorite) => favorite.universityId === university.id
	);

	const toggleFavorite = () => {
		if (isFavorite) {
			removeFavorite(university.id);
		} else {
			addFavorite(university.id);
		}
	};

	const toggleSelectionUniversity = () => {
		selectUniversity(university);
	};

	return (
		<div className='p-5 my-5 flex flex-col shadow-md shadow-slate-400'>
			<div className='flex justify-between'>
				<h2 className='font-bold capitalize'>
					{university.name} <span className='text-slate-500'>{university.country}</span>
				</h2>
				<div className='flex text-slate-500'>
					<span className='cursor-pointer text-2xl'>
						{isFavorite ? (
							<AiFillStar onClick={toggleFavorite} />
						) : (
							<AiOutlineStar onClick={toggleFavorite} />
						)}
					</span>
					<span className='cursor-pointer text-2xl'>
						<LuExternalLink onClick={toggleSelectionUniversity} />
					</span>
				</div>
			</div>
			<div className='pt-5 overflow-hidden text-start flex items-start'>
				<p className='truncate text-left w-full'>{university.description}</p>
			</div>
		</div>
	);
};

export default UniversityCardSmall;
