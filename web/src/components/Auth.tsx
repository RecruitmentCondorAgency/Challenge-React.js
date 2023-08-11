export function Auth() {
  return (
    <div className='bg-white max-w-lg mx-auto px-6 py-4 drop-shadow-lg rounded-md'>
      <form action=''>
        <fieldset className='flex flex-col gap-2 mb-4'>
          <label htmlFor='user' className='after:content-["*"] after:ml-0.5'>
            User
          </label>
          <input
            className='p-2 border rounded-md'
            placeholder='username'
            type='text'
            name='user'
            id='user'
          />
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
            name='password'
            id='password'
          />
        </fieldset>
        <button
          className='bg-sky-500 px-6 py-2 rounded-md w-full text-white font-bold'
          type='submit'
        >
          Login
        </button>
      </form>
    </div>
  );
}
