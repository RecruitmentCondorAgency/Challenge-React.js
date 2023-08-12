import { Link, useNavigate } from 'react-router-dom';
import { Card } from './Card';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { userAPI } from '../repository/api';

export function Login() {
  const defaultValues = {
    email: '',
    password: '',
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isError, isLoading, error } = useMutation({
    mutationFn: userAPI.loginUser,
    onSuccess: (data) => {
      const { password, ...user } = data;
      queryClient.setQueryData(['user'], user);
      localStorage.setItem('condor-user', JSON.stringify(user));
      navigate('/search');
    },
    onError: () => {
      reset({ password: '' });
    },
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = (data) => mutate(data);

  return (
    <Card className='max-w-lg mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='flex flex-col gap-2 mb-4'>
          <label htmlFor='user' className='after:content-["*"] after:ml-0.5'>
            User
          </label>
          <input
            disabled={isLoading}
            className='p-2 border rounded-md'
            placeholder='user@email.com'
            type='email'
            id='user'
            {...register('email', {
              required: 'The field is required',
            })}
          />
          <span className='text-xs text-red-500'>{errors?.email?.message}</span>
          <label
            htmlFor='password'
            className='after:content-["*"] after:ml-0.5'
          >
            Password
          </label>
          <input
            disabled={isLoading}
            className='p-2 border rounded-md'
            placeholder='****'
            type='password'
            id='password'
            {...register('password', {
              required: 'The field is required',
            })}
          />
          <span className='text-xs text-red-500'>
            {errors?.password?.message}
          </span>
        </fieldset>
        <button
          disabled={isLoading}
          className='bg-sky-500 px-6 py-2 rounded-md w-full text-white font-bold'
          type='submit'
        >
          {isLoading ? 'Enter...' : 'Login'}
        </button>
        <span className='text-xs text-red-500 block text-center my-2'>
          {isError && error.message}
        </span>
      </form>
      <Link className='text-center m-1 block text-sm' to='/register'>
        Don't have and account? create one
      </Link>
    </Card>
  );
}
