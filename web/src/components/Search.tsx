import { SubmitHandler, useForm } from 'react-hook-form';
import { UniversityCard } from './UniversityCard';
import { useQuery } from '@tanstack/react-query';
import { universityAPI } from '../repository/api';
import { useUniversity } from '../hooks/useUniversity';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export default function Search() {
  const defaultValues = {
    search: '',
  };

  const [quickResults, setQuickResults] = useState<string[]>([]);
  const [showQuickResult, setShowQuickResult] = useState(false);

  const { handleSubmit, register, watch, setValue } = useForm({
    defaultValues,
  });

  const { isFavorite, addUniversity, removeUniversity } = useUniversity();

  const search = watch('search');

  const {
    data: results,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['universities'],
    queryFn: () => universityAPI.searchUniversities(search),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const quickSearch = debounce((query: string) => {
    if (query.length === 0) return setQuickResults([]);
    setShowQuickResult(true);
    universityAPI.searchUniversities(query, 10).then((data) => {
      const names = data.map((uni) => uni.name);
      setQuickResults(names);
    });
  }, 500);

  useEffect(() => {
    quickSearch(search);

    return () => {};
  }, [search]);

  const handleClickQuickResult = (query: string) => {
    setValue('search', query);
    refetch();
  };

  const onSubmit: SubmitHandler<typeof defaultValues> = () => {
    refetch();
    setShowQuickResult(false);
  };

  return (
    <div className='max-w-lg mx-auto px-4'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col md:flex-row gap-4 mb-4'
      >
        <fieldset className='flex-grow relative'>
          <input
            className='p-2 border rounded-md w-full'
            type='search'
            id='search'
            spellCheck='false'
            placeholder='University name'
            aria-label='search university label'
            {...register('search', {
              required: true,
            })}
          />
          {showQuickResult && (
            <ul
              className='bg-white overflow-x-hidden rounded-sm shadow-lg text-black font-bold
           absolute w-full z-10 mt-2'
            >
              {quickResults.map((result, i) => (
                <li
                  key={`qs-${i}`}
                  className='hover:bg-sky-500 hover:text-white cursor-pointer transition-colors duration-100 w-full py-1 px-2'
                >
                  <button
                    aria-label='select-university'
                    onClick={() => handleClickQuickResult(result)}
                  >
                    {result}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </fieldset>
        <button
          className='bg-sky-500 px-6 py-2 rounded-md text-white font-bold'
          type='submit'
        >
          Search
        </button>
      </form>
      {isFetching && <p className='mb-4'>Searching new results...</p>}
      <div className='flex flex-col gap-4 mb-4'>
        {!isFetching && results?.length === 0 && (
          <p>There is not results, try with other name</p>
        )}
        {results?.map((university, i) => (
          <UniversityCard
            key={`ucard-${i}`}
            title={university.name}
            country={university.country}
            domains={university.domains}
            favorite={isFavorite(university)}
            addFavorite={() => addUniversity(university)}
            removeFavorite={() => removeUniversity(university)}
          />
        ))}
        {isError && <p>There was error, please try again</p>}
      </div>
    </div>
  );
}
