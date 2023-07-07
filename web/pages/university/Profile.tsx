import { useContext } from "react";
import UniversityBox from "./components/UniversityBox";
import AppContext from "../../context/AppContext";
import BigCard from "./components/BigCard";

const Profile = () => {
	const { universities, favorites, user } = useContext(AppContext);

	const myUniversities = universities.filter((university) =>
		favorites?.some(
			(favorite) => favorite.universityId === university.id && favorite.userId === user.id
		)
	);

	return (
		<div className='flex flex-col md:flex-row items-center justify-between w-full md:w-3/4 mx-auto'>
			<div className="w-full md:w-1/2">
				<h3 className='h-full font-bold text-3xl text-blue p-3 mt-[150px]'>My favorites</h3>
				<UniversityBox filteredUniversities={myUniversities} />
			</div>
			<div className="w-full md:w-1/2">
				<h3 className='h-full font-bold text-3xl text-blue p-3 m-3'>Selected University</h3>
				<BigCard />
			</div>
		</div>
	);
};

export default Profile;
