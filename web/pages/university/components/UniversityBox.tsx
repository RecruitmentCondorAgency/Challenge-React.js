import UniversityCardSmall from "./UniversityCardSmall";

const UniversityBox = ({ filteredUniversities }) => {

	return (
		<div className='w-screen md:w-1/2'>
			{filteredUniversities.map((university) => (
				<UniversityCardSmall university={university} key={university.id} />
			))}
		</div>
	);
};

export default UniversityBox;
