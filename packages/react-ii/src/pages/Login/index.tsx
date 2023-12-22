import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { Credentials } from '../../types/user';

const Login: React.FC = () => {
  const auth = useAuth();
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  // Handle input changes in the form fields
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      // Update the corresponding credential field in the state
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
      }));
    },
    [setCredentials]
  );

  // Handle form submission for user login
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Attempt to log in the user using the provided credentials
      auth.login(credentials);
    },
    [auth.login, credentials]
  );

  // Determine if the login button should be disabled based on input validation
  const isButtonDisabled = !(
    credentials.email.trim() !== '' && credentials.password.trim() !== ''
  );

  return (
    <div className="sm:flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 shadow-lg h-screen sm:h-auto">
        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <TextInput
            name="email"
            type="text"
            placeholder="Enter your email"
            label="Email"
            value={credentials.email}
            onChange={handleInputChange}
          />

          {/* Password input field */}
          <TextInput
            type="password"
            name="password"
            placeholder="********"
            label="Password"
            value={credentials.password}
            onChange={handleInputChange}
          />

          {/* Login button */}
          <Button type="submit" text="Login" disabled={isButtonDisabled} />
        </form>

        {/* Link to navigate to the registration page */}
        <div className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
