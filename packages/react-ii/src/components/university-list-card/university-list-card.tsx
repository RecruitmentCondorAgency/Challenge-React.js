import { StarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon, } from '@heroicons/react/24/solid';
import './university-list-card.sass';
import { University } from '../../types/university';

export interface UniversityListCardProps {
	university?: University
	selected?: boolean
	width?: number
}

const UniversityListCard = (props: UniversityListCardProps) => {
	const {width = 50, selected = false, university} = props;
	return (
		<div className="bg-white px-8 py-4 rounded-lg shadow-lg mt-2" style={{ width: `${width}%` }}>
			<div className='flex items-start justify-between'>
				<div className='flex flex-col items-center justify-between'>
					<div className='flex flex-row items-center w-full justify-start'>
						<h2 className='text-gray-800 font-medium'>University name</h2>
						<h3 className='text-gray-800' style={{ margin: '0px 0px 0px 25px' }}>Country</h3>
					</div>
					<div className='flex flex-row items-center w-full justify-start'>
						<p className='text-sm'>We'd like to see a proposal to enrich this module.Malesuada purus nibh dictumst odio sed elit adipiscing. Turpis malesuada nulla molestie ac gravida magna. Imperdiet tempus, commodo non morbi nisi. Et sit dictum velit facilisi id. Sed augue eget metus non habitant. Donec praesent vel tellus consequat turpis venenatis quis.
Curabitur urna arcu et venenatis, aliquet turpis elit risus. Sapien, at vitae molestie purus nec quam fermentum adipiscing. Varius eget nibh mi, ut dui nisi, cursus nunc. Hendrerit faucibus amet vel nisl, integer. Odio sit pretium sed nascetur vitae in aliquam feugiat integer.
</p>
					</div>
				</div>
				<div className='flex flex-row items-center justify-between icons-block'  style={{ margin: '0px 0px 0px 10px' }}>
					{selected ? <SolidStarIcon className="block h-4 w-4 m-[5px] cursor-pointer hover:bg-sky-300" aria-hidden="true" style={{ color: '#ffc233' }} /> : <StarIcon className="block h-4 w-4 m-[5px] cursor-pointer hover:bg-sky-300" aria-hidden="true" />}
					<ArrowTopRightOnSquareIcon className="block h-4 w-4 m-[5px] cursor-pointer hover:bg-sky-300" aria-hidden="true" />
				</div>
			</div>
		</div>
	)
}

export default UniversityListCard;

