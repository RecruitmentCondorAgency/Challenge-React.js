import { UniversityCard } from "./UniversityCard";

export default function Search() {
  return (
    <div className='max-w-lg mx-auto px-4'>
      <form className='flex flex-col md:flex-row gap-4 mb-4'>
        <fieldset className='flex-grow relative'>
          <input
            className='p-2 border rounded-md w-full'
            type='search'
            name='search'
            id='search'
            placeholder='University name'
            aria-label='search university label'
          />
          <ul
            className='bg-white overflow-x-hidden rounded-sm shadow-lg text-black font-bold
           absolute w-full z-10 mt-2'
          >
            <li className='hover:bg-sky-500 hover:text-white cursor-pointer transition-colors duration-100 w-full py-1 px-2'>
              University name
            </li>
            <li className='hover:bg-sky-500 hover:text-white cursor-pointer transition-colors duration-100 w-full py-1 px-2'>
              University name
            </li>
            <li className='hover:bg-sky-500 hover:text-white cursor-pointer transition-colors duration-100 w-full py-1 px-2'>
              University name
            </li>
            <li className='hover:bg-sky-500 hover:text-white cursor-pointer transition-colors duration-100 w-full py-1 px-2'>
              University name
            </li>
          </ul>
        </fieldset>
        <button
          className='bg-sky-500 px-6 py-2 rounded-md text-white font-bold'
          type='submit'
        >
          Search
        </button>
      </form>
      <div className='flex flex-col gap-4'>
        <UniversityCard
          title='University name'
          country='Country'
          description='We like to see a proposal'
        />
      </div>
    </div>
  );
}
