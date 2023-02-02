import {useEffect, useState} from "react";
import {getUniversities} from "../../services/UniversityService";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";

export default function SearchBar({ setUniversities, setShowResults }) {
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const identifier = setTimeout(async () => {
            const _universities = query ? await getUniversities(query) : []

            if (_universities) {
                setUniversities(_universities)

                const filteredUniversities = _universities.filter((university) =>
                    university.name.toLowerCase().includes(query.toLowerCase())
                ).slice(0, 5)

                if (filteredUniversities.length === 1 && filteredUniversities[0].name === query) {
                    setFilteredItems([])
                } else {
                    setFilteredItems(filteredUniversities)
                }
            } else {
                setUniversities([])
                setFilteredItems([])
            }
        }, 500);

        return () => {
            clearTimeout(identifier);
        };
    }, [query]);

    const handleInputChange = (event) => {
        const _query = event.target.value

        if (!_query) {
            setFilteredItems([])
        }

        setQuery(_query);
        setShowResults(false)
    };

    const handleSuggestionClick = (event) => {
        const suggestionText = event.target.value;

        setFilteredItems([])
        setQuery(suggestionText)
    }

    const handleSearch = () => {
        setShowResults(true)
    }

    return (
        <div className="flex justify-center my-4">
            <div className="md:w-1/3">
                <div className="mx-auto w-full transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white ring-1 ring-black ring-opacity-5 transition-all">
                    <input type="text" className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm" value={query} onChange={handleInputChange} />
                    <div className="max-h-72 scroll-py-2 overflow-y-auto text-sm text-gray-800">
                        {filteredItems.map(university => (
                            <div key={university.domain} className="block cursor-default select-none px-4 py-2">
                                <button onClick={handleSuggestionClick} value={university.name}>{university.name}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="ml-2">
                <button onClick={handleSearch} className="rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <MagnifyingGlassIcon className="h-6 w-6 -mx-2"/>
                </button>
            </div>
        </div>
    );
}