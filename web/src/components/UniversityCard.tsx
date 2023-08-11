import { Card } from './Card';

type ResultProps = {
  title: string;
  country: string;
  description: string;
};

export const UniversityCard: React.FC<ResultProps> = ({
  title,
  country,
  description,
}) => {
  return (
    <Card element='article'>
      <div className='flex flex-col mb-6'>
        <h3 className='text-black font-bold'>{title}</h3>
        <span>{country}</span>
        <div className='ml-auto flex gap-4'>
          <button>X</button>
          <button>O</button>
        </div>
      </div>
      <p>{description}</p>
    </Card>
  );
};
