import { useEffect, useState } from 'react';
import UniversityListCard from '../../components/university-list-card/university-list-card';
import { useAppSelector } from '../../hooks';
import { useSearchParams } from "react-router-dom";
import { University } from '../../types/university';
import UniversityService from '../../services/university-service';

const University = () => {
	const user = useAppSelector((state) => state.users)
	const [searchParams, setSearchParams] = useSearchParams();
	const [universityName, setUniversityName] = useState<string>('')
	const [university, setUniversity] = useState<University>()
	

	useEffect(() => {
		if (searchParams.get('university')) {
			setUniversityName(searchParams.get('university'))
		}
	}, [searchParams])

	useEffect(() => {
		const fetchUniversityDetails =async () => {
			if (!!universityName) {
				const universityResponse = await UniversityService.searchUniversity(universityName);
				if (universityResponse.status === '200') {
					setUniversity(universityResponse.response[0])
				} 
			}

		}
		fetchUniversityDetails()
	}, [universityName])

	return (
		<div className="flex min-h-full flex-1 flex-row justify-center items-start px-6 py-12 lg:px-8">
			{user?.user?.universities?.length ? <div className="flex min-h-full flex-1 flex-col justify-center items-center px-2" style={{ width: `50%` }}>
				<div className='text-sky-700 text-left w-full p-4 font-medium' style={{ fontSize: 'x-large' }}>
					My favorites
				</div>
				{user?.user?.universities?.map((uni) => {
					return (
						<UniversityListCard width={70} university={uni} />
					);
				})}
			</div> : null}

			{!!university && <div className="flex min-h-full flex-1 flex-col justify-center items-center px-2" style={{ width: `50%` }}>
				<div className='text-sky-700 text-left w-full p-4 font-medium' style={{ fontSize: 'x-large' }}>
					Selected University
				</div>
				<UniversityListCard width={100} university={university} hideControls={true} showDetails={true} />
			</div>}
		</div>
	)
}

export default University;
