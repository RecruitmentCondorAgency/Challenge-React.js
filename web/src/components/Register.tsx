import { Link, useNavigate } from 'react-router-dom';
import { Card } from './Card';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userAPI } from '../repository/api';
import { useDispatch } from 'react-redux';
import { saveUser } from '../store/userSlice';

export function Register() {
  const defaultValues = {
    email: '',
    password: '',
    repeatPassword: '',
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { mutate, isError, isLoading } = useMutation({
    mutationFn: userAPI.registerUser,
    onSuccess: (data) => {
      const { password, ...user } = data;
      queryClient.setQueryData(['user'], user);
      dispatch(saveUser(user));
      navigate('/');
    },
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = (data) => {
    const { repeatPassword, ...user } = data;
    mutate(user);
  };

  return (
    <Card className='max-w-lg mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='flex flex-col gap-2 mb-4'>
          <label htmlFor='user' className='after:content-["*"] after:ml-0.5'>
            Email
          </label>
          <input
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
          <label
            htmlFor='repeat-password'
            className='after:content-["*"] after:ml-0.5'
          >
            Repeat password
          </label>
          <input
            disabled={isLoading}
            className='p-2 border rounded-md'
            placeholder='****'
            type='password'
            id='repeat-password'
            {...register('repeatPassword', {
              required: 'The field is required',
              validate: {
                match: (v, { password }) =>
                  password === v || 'The password must match',
              },
            })}
          />
          <span className='text-xs text-red-500'>
            {errors?.repeatPassword?.message}
          </span>
        </fieldset>
        <button
          disabled={isLoading}
          className='bg-sky-500 px-6 py-2 rounded-md w-full text-white font-bold disabled:bg-sky-500/60'
          type='submit'
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
        <span className='text-xs text-red-500 block text-center my-2'>
          {isError && 'There was and error, try again latet'}
        </span>
      </form>
      <Link className='text-center m-1 block text-sm' to='/login'>
        Have and account already? login now
      </Link>
    </Card>
  );
}
