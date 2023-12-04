import { useEffect, useState } from 'react';
import Card from '../../components/card/card';
import UserService from '../../services/user-service';
import { APIResponse } from '../../types/api';
import { User } from '../../types/user';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/users/userSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';

const Register = () => {
	const [email, setEmail] = useState<string>('');
	const [emailErrpr, setEmailError] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const dispatch = useAppDispatch()
	const navigate = useNavigate();
	const validations = () => {
		const validateEmail = (email) => {
			return String(email)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
		};

		if (email && !validateEmail(email)) {
			setEmailError('Please Enter a valid Email');
			return false
		}

		if (password !== confirmPassword) {
			setPasswordError('Please make sure both passwords match.');
			return false
		}
		return true
	}

	useEffect(function () {
		setEmailError('')
		setPasswordError('')
		validations();

	}, [email, password, confirmPassword])


	const registrationHandler = async () => {
		setEmailError('')
		setPasswordError('')
		if (!email) {
			setEmailError('Please Enter Email')
		}
		if (!password) {
			setPassword('Please enter password')
		}
		if (validations()) {
			const response: APIResponse<User> = await UserService.getUserByEmail(email);
			console.log(response)
			if (response.status == '200') {
				setEmailError('Email already exists')
			} else {
				const regResponse: APIResponse<User> = await UserService.registerUser({
					email: email,
					password: password,
					universities: []
				});
				if (regResponse.status == '200') {
					localStorage.setItem("currentUser", JSON.stringify(regResponse.response));
					dispatch(setUser(regResponse.response))
					navigate("/search")
				} else {
					setEmailError('Registration failed')
				}
			}
		}

	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<Card>
				<form className="space-y-6" action="#" method="POST">
					<div>
						<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								value={email}
								onChange={(e) => {
									setEmail(e?.target?.value)
								}}
								autoComplete="email"
								required
								placeholder='Email'
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							{emailErrpr && <><span className='text-sm' style={{ color: 'red' }}>*{emailErrpr}</span></>}

						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
								Password
							</label>

						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e?.target?.value)
								}}
								autoComplete="current-password"
								required
								placeholder='Password'
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
								Confirm Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="confirm-password"
								name="confirm-password"
								type="password"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e?.target?.value)
								}}
								autoComplete="current-password"
								required
								placeholder='Enter your password again'
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							{passwordError && <><span className='text-sm' style={{ color: 'red' }}>*{passwordError}</span></>}
						</div>
					</div>

					<div>
						<button
							type="button"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={registrationHandler}
						>
							Register
						</button>
					</div>
				</form>

			</Card>
		</div>
	)
}

export default Register;
