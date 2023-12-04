import { useEffect, useState } from 'react'
import UniversityListCard from '../../components/university-list-card/university-list-card';
import Card from '../../components/card/card';
import { Combobox } from '@headlessui/react'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import { useDebounce } from "use-debounce";
import { useAppDispatch, useAppSelector } from '../../hooks';
import UniversityService from '../../services/university-service';
import { setUniversities } from '../../features/universities/universitySlice';
import { User } from '../../types/user';
import { Navigate } from 'react-router-dom';

const Search = () => {

	const [query, setQuery] = useState('')
	const [debouncedQuery] = useDebounce(query, 500);
	const universities = useAppSelector((state) => state.universities)
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (debouncedQuery) {
			const queryHandler = async (query: string) => {
				const result = await UniversityService.searchUniversity(query);
				dispatch(setUniversities(result.response))
			}
			queryHandler(debouncedQuery)
		} else {
			dispatch(setUniversities([]))
		}
	}, [debouncedQuery]);
	const getLocalStorageUser = () => {
		const userFromStorage = localStorage.getItem("currentUser");
		if (userFromStorage && Object.keys(userFromStorage).length) {
			return JSON.parse(userFromStorage) as User
		} else {
			return null;
		}
	}
	return (
		<>
			{!(getLocalStorageUser()?.email) ? <Navigate to={'/login'} /> :
				<div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
					<div className="mt-2 mb-10 relative" style={{ width: `70%` }}>

						<Combobox value={query} onChange={setQuery}>
							<div className="flex flex-row">
								<div style={{ width: '80%' }}>

									<Combobox.Input onChange={(event) => setQuery(event.target.value)} className={'w-full'} />

								</div>
								<div style={{ width: '20%' }} className="px-4">
									<div className=' flex justify-center items-center bg-sky-500 hover:bg-white rounded-lg w-full text-white hover:text-gray-700' style={{ height: '100%', minWidth: '42px' }}>
										<MagnifyingGlassCircleIcon className="block h-8 w-8 cursor-pointer " aria-hidden="true" />
									</div>
								</div>
							</div>
							<Combobox.Options className={'absolute text-gray-900 bg-white w-full p-4'}>

								{universities?.universities?.map((uni) => {
									return (
										<Combobox.Option key={uni.name} value={uni.name} className={'mt-2 hover:text-gray-800 hover:font-medium'}>
											{uni.name}
										</Combobox.Option>
									);
								})}
							</Combobox.Options>
						</Combobox>

					</div>
					{universities?.universities?.map((uni) => {
						return (
							<UniversityListCard width={70} university={uni} />
						);
					})}
				</div>
			}
		</>
	)
}

export default Search;
