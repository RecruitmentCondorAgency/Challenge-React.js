import { AiOutlineArrowRight } from "react-icons/ai";
import { useForm } from "../../hooks/useForm";

const Login = () => {
	const { formData, error, handleSubmit, handleChange } = useForm();

	return (
		<div className='flex items-center justify-center h-screen flex-col'>
			{error && (
				<div className='w-full md:w-2/5'>
					<p className='font-semibold text-center text-red-600'>{error}</p>
				</div>
			)}
			<form
				className='bg-white shadow-2xl rounded px-8 pt-6 pb-8 w-full md:w-2/5'
				onSubmit={handleSubmit}
			>
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
						Usuario
					</label>
					<input
						className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='email'
						type='email'
						name='email'
						placeholder='Email'
						value={formData.email}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='password'
					>
						Password
					</label>
					<input
						className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='password'
						type='password'
						name='password'
						placeholder='Password'
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				<div className='flex items-center justify-center'>
					<button
						className='flex align-middle items-center justify-center w-full bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='submit'
					>
						Login
						<span className='ml-2 text-2xl'>
							<AiOutlineArrowRight />
						</span>
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
