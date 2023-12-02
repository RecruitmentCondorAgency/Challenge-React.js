import { useState } from 'react'
import UniversityListCard from '../../components/university-list-card/university-list-card';
import Card from '../../components/card/card';
import { Combobox } from '@headlessui/react'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import './search.sass';

const people = [
	'Wade Cooper',
	'Arlene McCoy',
	'Devon Webb',
	'Tom Cook',
	'Tanya Fox',
	'Hellen Schmidt',
]
const Search = () => {
	const [selectedPerson, setSelectedPerson] = useState(people[0])
	const [query, setQuery] = useState('')

	const filteredPeople =
		query === ''
			? people
			: people.filter((person) => {
				return person.toLowerCase().includes(query.toLowerCase())
			})
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
				<div className="mt-2 mb-10 relative" style={{ width: `70%` }}>

					<Combobox value={selectedPerson} onChange={setSelectedPerson}>
						<div className="flex flex-row">
							<div style={{ width: '80%' }}>

								<Combobox.Input onChange={(event) => setQuery(event.target.value)} className={'w-full'} />

							</div>
							<div style={{ width: '20%' }} className="px-4">
								<div className=' flex justify-center items-center bg-sky-500 hover:bg-white rounded-lg w-full text-white hover:text-gray-700' style={{ height: '100%' }}>

									<MagnifyingGlassCircleIcon className="block h-8 w-8 cursor-pointer " aria-hidden="true" />
								</div>
							</div>
						</div>
						<Combobox.Options className={'absolute text-gray-900 bg-white w-full p-4'}>
							{filteredPeople.map((person) => (
								<Combobox.Option key={person} value={person} className={'mt-2 hover:text-gray-800 hover:font-medium'}>
									{person}
								</Combobox.Option>
							))}
						</Combobox.Options>
					</Combobox>

				</div>

				<UniversityListCard width={70} />
				<UniversityListCard width={70} />
				<UniversityListCard width={70} />
			</div>
		</>
	)
}

export default Search;
