import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { Stack, TextField, Button, FormLabel,Backdrop, CircularProgress } from '@mui/material';
import {useFormik, Form, FormikProvider} from 'formik';
import Select from 'react-select';
import { publicauthService } from '../services/publicauth.service';
import Lodingbc from './loadingbc';

const Register: React.FC = () => {
	const navigate = useNavigate();
	const [option, setOption] = useState([]);
	const [country, setCountry] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [countryError, setCountryError] = useState("");

	const getSearchdata = useCallback(async () => {
		let isMounted = true;
    const getUniversities = async () => {
			const countrydata  = await publicauthService.countryApi();
			const newData =  countrydata?.data?.map((item) => {
				return { value: item.name.common, label: item.name.common };
			});
			setOption(newData);
			setLoading(false);
    };
    getUniversities().catch((err) => {
      if (!isMounted) return;
      console.error("failed to fetch data", err);
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
	}, [publicauthService]);

	const RegisterSchema = Yup.object().shape({
		//country: Yup.string().required('Country is required'),
		email: Yup.string().email('Email must be a valid email address').required('Email is required'),
		password: Yup.string().required('Password is required')
	});

	const formik = useFormik({
		initialValues: {
			country: country,
			email: '',
			password: ''
		},
		validationSchema: RegisterSchema,
		onSubmit: async (formData) => {
			console.log(country);
			if (!country.value || country.valueOf == undefined) {
				setCountryError("Please select country.");
				setLoading(false);
			} else {
				formData.country = country.value;
				console.log("formdata", formData);
				setLoading(true);
				const data = await publicauthService.registerApi(formData);
				console.log("neeewdata -->", data);
				if (data && data?.id) {
					//toast.success("success massage");
					console.log("register -->", data);
					sessionStorage.setItem("uid", JSON. stringify(data));
					navigate('/profile');
				} else {
					//toast.error("error msg");
					setError("Email or Password invalid.");
				}
			}
			setLoading(false);
		}
	});

	const { 
    errors, 
		touched, 
		isSubmitting, 
		handleSubmit,
		getFieldProps 
	} = formik;

	useEffect(() => {
		getSearchdata();
	},[publicauthService]);

	return (
    <div className='bg-white p-10 drop-shadow-sm'>
    {loading ? (
        <Lodingbc open={loading}/>
      ) : (
        ''
      )}
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack className="bg-transparent border-none"  >
            <FormLabel>
              Email <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField className="!mb-4"
              fullWidth
              type="email"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              InputLabelProps={{ shrink: true }}
              placeholder="Email"
            />
            <FormLabel>
              Password <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <TextField className="!mb-4"
              fullWidth
              name="password"
              type='password'
              {...getFieldProps('password')}
              InputLabelProps={{ shrink: true }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              placeholder="Password"
            />
            <FormLabel>
              Country <span style={{ color: 'red' }}>*</span>
            </FormLabel>
            <Select 
              className="!mb-4"
              name="country" 
              options={option} 
              placeholder="Select Country"
              isSearchable={true}
              onChange={(value) => setCountry(value)}
            />
            {
              (Boolean(touched.country && errors.country) || countryError) && 
              <p style={{color: 'red'}}>
                {errors?.country || countryError}
              </p>
            }

            <Button fullWidth size="large" type="submit" variant="contained" >
              Register
            </Button>
          </Stack>

        </Form>
      </FormikProvider>
      {
        error && <p className='text-[#d32f2f] text-[12px] ms-[15px]'>
          {error}
        </p>
      }
      
				<div className='text-center w-full mt-3'>
        Already have an account? &nbsp;
        <Link to={`/login`}>
            Sign In
          </Link>
				</div>
			
    </div>
	);
}

export default Register;