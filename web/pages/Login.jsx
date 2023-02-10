import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomToast from '../components/CustomToast'
import { API_URL } from '../constants'
import { AuthContext } from '../context/AuthContext'
import { ToastContext } from '../context/ToastContext'

const validate = (values) => {
	const errors = {}
	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}

	if (!values.password) {
		errors.password = 'Required'
	} else if (values.password.length < 8) {
		errors.password = 'Must be 8 characters or more'
	}

	return errors
}

export default function Login() {
	const [checked, setChecked] = React.useState(false)
	const { login } = React.useContext(AuthContext)
	const { toast } = React.useContext(ToastContext)
	let navigate = useNavigate()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate,
		onSubmit: (values) => {
			const { email, password } = values
			fetch(`${API_URL}/users?email=${email}&password=${password}`)
				.then((res) => res.json())
				.then((data) => {
					if (data.length > 0) {
						toast?.current?.show({
							severity: 'success',
							summary: 'Success',
							detail: 'Logged in!',
							life: 3000,
						})
						login(data[0])
						navigate('/search')
					} else {
						toast?.current?.show({
							severity: 'error',
							summary: 'Error',
							detail: 'Invalid credentials',
							life: 3000,
						})
					}
				})
				.catch((err) => {
					toast?.current?.show({
						severity: 'error',
						summary: 'Error',
						detail: 'Server error',
						life: 3000,
					})
				})
		},
	})

	return (
		<div className="flex align-items-center justify-content-center">
			<CustomToast toast={toast} />
			<div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
				<div className="text-center mb-5">
					<img
						src="https://cdn3.iconfinder.com/data/icons/strokeline/128/revisi_02-256.png"
						alt="hyper"
						height={50}
						className="mb-3"
					/>
					<div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
					<span className="text-600 font-medium line-height-3">
						Don't have an account?
					</span>
					<Link
						to='/register'
						className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
					>
						Create one here!
					</Link>
				</div>

				<form onSubmit={formik.handleSubmit}>
					<label htmlFor="email" className="block text-900 font-medium mb-2">
						Email
					</label>
					<InputText
						id="email"
						type="text"
						placeholder="Email address"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
						className="w-full"
					/>
					{formik.touched.email && formik.errors.email ? (
						<div className="text-red-500 text-xs">{formik.errors.email}</div>
					) : null}

					<label
						htmlFor="password"
						className="block text-900 font-medium mb-2 mt-3"
					>
						Password
					</label>
					<InputText
						id="password"
						type="password"
						placeholder="Password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
						className="w-full mb-3"
					/>
					{formik.touched.password && formik.errors.password ? (
						<div className="text-red-500 text-xs">{formik.errors.password}</div>
					) : null}

					<div className="flex align-items-center justify-content-between mb-6">
						<div className="flex align-items-center">
							<Checkbox
								id="rememberme"
								onChange={(e) => setChecked(e.checked)}
								checked={checked}
								className="mr-2"
							/>
							<label htmlFor="rememberme">Remember me</label>
						</div>
						<a
							href=''
							className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
						>
							Forgot your password?
						</a>
					</div>

					<Button
						label="Sign In"
						icon="pi pi-arrow-right"
						iconPos='right'
						className="w-full"
						type='submit'
						disabled={!(formik.isValid && formik.dirty)}
					/>
				</form>
			</div>
		</div>
	)
}
