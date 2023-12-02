import UniversityListCard from '../../components/university-list-card/university-list-card';
import './university.sass';

const University = () => {
	return (
		<div className="flex min-h-full flex-1 flex-row justify-center items-start px-6 py-12 lg:px-8">
		<div className="flex min-h-full flex-1 flex-col justify-center items-center px-2" style={{ width: `50%` }}>
			<div className='text-sky-700 text-left w-full p-4 font-medium' style={{fontSize:'x-large'}}>
				My favorites
			</div>
			<UniversityListCard width={100} />
			<UniversityListCard width={100} />
		</div>

		<div className="flex min-h-full flex-1 flex-col justify-center items-center px-2" style={{ width: `50%` }}>
		<div className='text-sky-700 text-left w-full p-4 font-medium' style={{fontSize:'x-large'}}>
				Selected University
			</div>
			<UniversityListCard width={100} />
		</div>
		</div>
	)
}

export default University;