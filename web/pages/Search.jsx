import { AutoComplete } from 'primereact/autocomplete'
import React from 'react'
import UniversityCard from '../components/UniversityCard'
import { UNIVERSITIES_URL } from '../constants'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'

export default function Search() {
	const [value, setValue] = React.useState('')
	const [items, setItems] = React.useState([])
	const [suggestions, setSuggestions] = React.useState([])
	const debounceValue = useDebounce(value, 500)
	const { data, error } = useFetch(
		`${UNIVERSITIES_URL}/search?name=${value || 'default'}`,
	)

	const search = async (event) => {
		if (error) return
		setItems(await data?.slice(0, 10))
		const response = items
			?.filter(
				async (item) =>
					await item?.name.toLowerCase().startsWith(event.query.toLowerCase()),
			)
			.slice(0, 10)
		setSuggestions(response?.map((item) => item?.name).slice(0, 10))
	}

	React.useEffect(() => { }, [debounceValue])


	return (
		<article className=''>
			<AutoComplete
				value={value}
				suggestions={suggestions}
				completeMethod={search}
				onChange={(e) => setValue(e.value)}
				className='grid justify-content-center mb-5 mt-5'
				placeholder='Search for a university'
			/>
			<section className=''>
				{items
					?.filter((item) =>
						item?.name.toLowerCase().startsWith(value.toLocaleLowerCase()),
					)
					.map((item) => (
						<UniversityCard key={item?.id} university={item} />
					))}
			</section>
		</article>
	)
}
