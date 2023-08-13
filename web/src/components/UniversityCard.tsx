import { University } from '../types/university';
import { Card } from './Card';
import { StarFilledIcon, StarIcon } from './Icons';

type ResultProps = {
  title: string;
  country: string;
  domains: University['domains'];
  favorite?: boolean;
};

export const UniversityCard: React.FC<ResultProps> = ({
  title,
  country,
  domains,
  favorite = false,
}) => {
  return (
    <Card element='article'>
      <div className='flex flex-col mb-6 md:flex-row md:gap-2'>
        <h3 className='text-black font-bold'>{title}</h3>
        <span>{country}</span>
        <div className='ml-auto flex gap-4'>
          <button
            aria-label='add to favorites'
            className={`hover:bg-slate-100 rounded-full p-1
           flex items-center justify-center
            hover:text-yellow-500 transition-colors`}
          >
            {favorite ? (
              <StarFilledIcon className='w-6 h-6 fill-yellow-500' />
            ) : (
              <StarIcon className='w-6 h-6' />
            )}
          </button>
          <button>O</button>
        </div>
      </div>
      <p>Domains</p>
      {domains?.map((domain) => (
        <span key={`domain-${domain}`} className='font-semibold'>
          {domain}
        </span>
      ))}
    </Card>
  );
};
