import { StarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon, } from '@heroicons/react/24/solid';
import { University } from '../../types/university';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { APIResponse } from '../../types/api';
import { User } from '../../types/user';
import UserService from '../../services/user-service';
import { setUser } from '../../features/users/userSlice';

export interface UniversityListCardProps {
	university?: University
	width?: number
}

const UniversityListCard = (props: UniversityListCardProps) => {
	const { width = 50, university } = props;
	const user = useAppSelector((state) => state.users)
	const [selected, setSelected] = useState<boolean>(false);
	const dispatch = useAppDispatch()

	const toggleSelection = async () => {
		if (selected) {
			const response: APIResponse<User> = await UserService.removeUniversityFromFavourites(user.user, university);
			console.log(response)
			if (response.status !== '200') {
				alert('Could Not remove from Favourites')
			} else {
				dispatch(setUser(response.response))
				setSelected(!selected)
			}
		} else {
			const response: APIResponse<User> = await UserService.addFavouriteUniversity(user.user, university);
			console.log(response)
			if (response.status !== '200') {
				alert('Could not add to favourites')
			} else {
				dispatch(setUser(response.response))
				setSelected(!selected)
			}
		}
	}
	useEffect(() => {
		if (university?.name) {
			const found = user?.user.universities.find((uni) => uni?.name === university?.name);
			setSelected(!!found)
		}
	}, [user, university])
	return (
		<div className="bg-white px-8 py-4 rounded-lg shadow-lg mt-2" style={{ width: `${width}%` }}>
			<div className='flex items-start justify-between'>
				<div className='flex flex-col items-center justify-between'>
					<div className='flex flex-row items-center w-full justify-start'>
						<h2 className='text-gray-800 font-medium'>{university?.name}</h2>
						<h3 className='text-gray-800' style={{ margin: '0px 0px 0px 25px' }}>{university?.country}</h3>
					</div>
					<div className='flex flex-row items-center w-full justify-start'>
						<p className='text-sm'>{university?.name} is the best university.
						</p>
					</div>
				</div>
				<div className='flex flex-row items-center justify-between icons-block' style={{ margin: '0px 0px 0px 10px' }}>
					{selected ? <SolidStarIcon className="block h-4 w-4 m-[5px] cursor-pointer hover:bg-sky-300" aria-hidden="true" style={{ color: '#ffc233' }} onClick={toggleSelection} /> : <StarIcon className="block h-4 w-4 m-[5px] cursor-pointer hover:bg-sky-300" aria-hidden="true" onClick={toggleSelection} />}
					<ArrowTopRightOnSquareIcon className="block h-4 w-4 m-[5px] cursor-pointer hover:bg-sky-300" aria-hidden="true" />
				</div>
			</div>
		</div>
	)
}

export default UniversityListCard;

