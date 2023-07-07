import { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import axios from "axios";

const BigCard: React.FC = () => {
	const { selectedUniversity } = useContext(AppContext);

	const [currency, setCurrency] = useState<any>(null);
	const [languages, setLanguages] = useState<[string, string][]>([]);
	const [population, setPopulation] = useState<number | null>(null);

	useEffect(() => {
		const fetchCountryData = async () => {
			try {
				const response = await axios.get(
					`https://restcountries.com/v3.1/name/${selectedUniversity?.country}`
				);
				const countryData = response.data[0];
				setLanguages(Object.entries(countryData.languages));
				const currencies = countryData.currencies;
				const currencyValues = Object.values(currencies);
				setCurrency(currencyValues[0]);
				setPopulation(countryData.population);
			} catch (error) {
				console.error("Error al obtener los datos del país:", error);
			}
		};
		if (selectedUniversity) {
			fetchCountryData();
		}
	}, [selectedUniversity]);

	if (!selectedUniversity) {
		return <h3>Please Select a University</h3>;
	}

	return (
		<div className='flex flex-col shadow-sm shadow-slate-500 w-full'>
			<h3 className='font-bold text-xl'>{selectedUniversity?.name}</h3>
			<p className='p-1 my-3'>{selectedUniversity?.description}</p>
			<ul className='space-y-4'>
				<li>
					<b>Website:</b> {selectedUniversity?.website}
				</li>
				<li>
					<b>Location:</b>
					{` ${selectedUniversity?.city} - ${selectedUniversity?.country}`}
				</li>
				<li>
					<b>Currency: </b>
					{currency?.name} - {currency?.symbol}
				</li>
				<li>
					<b>Lenguage:</b>
					{languages?.map(([code, name]) => (
						<span key={code}> {name} </span>
					))}
				</li>
				<li>
					<b>Population: </b>
					{population}
				</li>
			</ul>
		</div>
	);
};

export default BigCard;
