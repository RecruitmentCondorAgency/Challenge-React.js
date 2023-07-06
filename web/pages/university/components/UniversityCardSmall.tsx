import React, { useContext, useState } from "react";
import { University } from "../../../types/types";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { LuExternalLink } from "react-icons/lu";
import AppContext from "../../../context/AppContext";

const UniversityCardSmall: React.FC<{ university: University }> = ({ university }) => {
	// const [isFavorite, setIsFavorite] = useState(false);

	const { favorites, addFavorite, removeFavorite } = useContext(AppContext);
	const isFavorite = favorites.some(
		(favorite) => favorite.universityId === university.id
	);

	const toggleFavorite = () => {
		if (isFavorite) {
			removeFavorite(university.id);
		} else {
			addFavorite(university.id);
		}
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
						<LuExternalLink />
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
