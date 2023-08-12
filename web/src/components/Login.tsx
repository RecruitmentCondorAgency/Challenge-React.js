import { Link } from 'react-router-dom';
import { Card } from './Card';
import { useForm, SubmitHandler } from 'react-hook-form';

export function Login() {
  const defaultValues = {
    user: '',
    password: '',
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit: SubmitHandler<typeof defaultValues> = (data) => {
    // TODO: Send request to backend and redirect if correct
  };
  return (
    <Card className='max-w-lg mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='flex flex-col gap-2 mb-4'>
          <label htmlFor='user' className='after:content-["*"] after:ml-0.5'>
            User
          </label>
          <input
            className='p-2 border rounded-md'
            placeholder='username'
            type='text'
            id='user'
            {...register('user', {
              required: 'The field is required',
            })}
          />
          <span className='text-xs text-red-500'>{errors?.user?.message}</span>
          <label
            htmlFor='password'
            className='after:content-["*"] after:ml-0.5'
          >
            Password
          </label>
          <input
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
          className='bg-sky-500 px-6 py-2 rounded-md w-full text-white font-bold'
          type='submit'
        >
          Login
        </button>
      </form>
      <Link className='text-center m-1 block text-sm' to='/register'>
        Don't have and account? create one
      </Link>
    </Card>
  );
}
