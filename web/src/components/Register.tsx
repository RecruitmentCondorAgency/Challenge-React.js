import { Link } from 'react-router-dom';
import { Card } from './Card';
import { SubmitHandler, useForm } from 'react-hook-form';

export function Register() {
  const defaultValues = {
    user: '',
    password: '',
    repeatPassword: '',
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit: SubmitHandler<typeof defaultValues> = (data) => {
    const { repeatPassword, ...user } = data;
    // TODO: Save user to db
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
          <label
            htmlFor='repeat-password'
            className='after:content-["*"] after:ml-0.5'
          >
            Repeat password
          </label>
          <input
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
          className='bg-sky-500 px-6 py-2 rounded-md w-full text-white font-bold'
          type='submit'
        >
          Create account
        </button>
      </form>
      <Link className='text-center m-1 block text-sm' to='/login'>
        Have and account already? login now
      </Link>
    </Card>
  );
}
