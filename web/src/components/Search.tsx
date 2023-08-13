import { SubmitHandler, useForm } from 'react-hook-form';
import { UniversityCard } from './UniversityCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { universityAPI, userAPI } from '../repository/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { University } from '../types/university';
import { useEffect } from 'react';
import { saveUser } from '../store/userSlice';

export default function Search() {
  const defaultValues = {
    search: '',
  };

  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id === 0) {
      const prevUser = localStorage.getItem('condor-user');
      if (prevUser) {
        const userSaved = JSON.parse(prevUser);
        dispatch(saveUser(userSaved));
      }
    }
    return () => {};
  }, []);

  const isFavorite = (university: University) =>
    user.universities.some((uni) => uni.name === university.name);

  const { handleSubmit, register, watch } = useForm({ defaultValues });

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

  const queryClient = useQueryClient();

  const { mutate: addUniversity } = useMutation({
    mutationFn: (university: University) =>
      userAPI.addUniversity(user, university),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['universities']);
      dispatch(saveUser(data));
    },
  });
  const { mutate: removeUniversity } = useMutation({
    mutationFn: (university: University) =>
      userAPI.removeUniversity(user, university),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['universities']);
      dispatch(saveUser(data));
    },
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = () => refetch();

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
            {...register('search', { required: true })}
          />
          {/* <ul
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
          </ul> */}
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
