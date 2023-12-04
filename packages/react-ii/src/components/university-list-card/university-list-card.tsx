import { StarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon, } from '@heroicons/react/24/solid';
import { University } from '../../types/university';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { APIResponse } from '../../types/api';
import { User } from '../../types/user';
import UserService from '../../services/user-service';
import { setUser } from '../../features/users/userSlice';
import { Country } from '../../types/country';
import CountryService from '../../services/country-service';

export interface UniversityListCardProps {
	university?: University
	width?: number
	hideControls?: boolean
	showDetails?: boolean
}

const UniversityListCard = (props: UniversityListCardProps) => {
	const { width = 50, university, hideControls = false, showDetails = false } = props;
	const user = useAppSelector((state) => state.users)
	const [selected, setSelected] = useState<boolean>(false);
	const [country, setCountry] = useState<Country>()
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
		const fetchUniversityDetails = async () => {
			const country = await CountryService.fetchCountryDetails(university.alpha_two_code);
			if (!!country.response) {
				console.log(country.response)
				setCountry(country.response)
			}
		}
		if (university?.name) {
			const found = user?.user.universities.find((uni) => uni?.name === university?.name);
			setSelected(!!found)
			fetchUniversityDetails()
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
					<div className='flex flex-col items-center w-full justify-start'>
						<p className='text-sm'>{university?.name} is the best university.</p>
						{showDetails && <>
						<p className='text-sm'>Website: {university?.web_pages?.length ? university.web_pages[0] : ''}</p>
						<p className='text-sm'>Location: {university?.country}, {university['state-province']}</p>
						<p className='text-sm'>Country's capital: {university?.country}, {country?.capital?.length ? country.capital[0] : ''}</p>
						<p className='text-sm'>Currency: {country?.currencies ? country?.currencies[Object.keys(country.currencies)[0]]?.name : ''}</p>
						<p className='text-sm'>Language: {country?.languages ? country?.languages[Object.keys(country.languages)[0]] : ''}</p>
						<p className='text-sm'>Population: {country?.population}</p>

						</>}
					</div>
				</div>
				{!hideControls && <div className='flex flex-row items-center justify-between icons-block' style={{ margin: '0px 0px 0px 10px' }}>
					{selected ? <SolidStarIcon className="block h-4 w-4 m-[5px] cursor-pointer hover:bg-sky-300" aria-hidden="true" style={{ color: '#ffc233' }} onClick={toggleSelection} /> : <StarIcon className="block h-4 w-4 m-[5px] cursor-pointer hover:bg-sky-300" aria-hidden="true" onClick={toggleSelection} />}
					<ArrowTopRightOnSquareIcon className="block h-4 w-4 m-[5px] cursor-pointer hover:bg-sky-300" aria-hidden="true" />
				</div>}
			</div>
		</div>
	)
}

export default UniversityListCard;

