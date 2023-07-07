import { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import AppContext from "../../context/AppContext";
import UniversityBox from "./components/UniversityBox";

const Search = () => {
	const { universities, isLoadingUniversities } = useContext(AppContext);

	const [filter, setFilter] = useState("");

	const filterValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(event.target.value);
	};

	const filteredUniversities = universities.filter((university) =>
		university.name.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<div className=' flex items-center justify-start mt-[150px] h-screen flex-col w-full md:w-1/2 mx-auto'>
			{/* Panel de Busqueda */}
			<div className='flex items-center jus text-2xl shadow-sm shadow-slate-400'>
				<input
					className='bg-white focus:outline-none focus:shadow-outline rounded-lg py-2 px-4 block w-full appearance-none leading-normal'
					type='text'
					placeholder='Search'
					onChange={filterValue}
				/>
				<div className='bg-blue m-0 h-full flex justify-center items-center rounded-lg'>
					<button className='text-white hover:text-slate-300 px-4'>
						<span className='text-2xl'>
							<AiOutlineSearch />
						</span>
					</button>
				</div>
			</div>
			{/* Cards de universidades */}
			{!isLoadingUniversities && universities.length > 0 ? (
				<UniversityBox filteredUniversities={filteredUniversities} />
			) : (
				<div className='text-center mt-4'>
					{isLoadingUniversities ? "Loading..." : "No universities found."}
				</div>
			)}
		</div>
	);
};

export default Search;
