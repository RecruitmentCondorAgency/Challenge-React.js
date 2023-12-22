import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { useToast } from "../../contexts/ToastContext";
import { Credentials } from "../../types/user";
import { toastType } from "../../types/enums";
import { registerUserAPI } from "../../api/utils";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // State to hold user registration credentials (email and password)
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
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

  // Handle form submission for user registration
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Attempt to register the user using the provided credentials
      const response = await registerUserAPI(credentials);

      // Display a toast based on the registration result
      if (response) {
        showToast(toastType.success, "User created successfully");
        navigate("/login");
      } else {
        showToast(toastType.error, "Something went wrong");
      }
    },
    [credentials, showToast, navigate]
  );

  // Determine if the registration button should be disabled based on input validation
  const isButtonDisabled = !(credentials.email.trim() !== "" && credentials.password.trim() !== "");

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

          {/* Registration button */}
          <Button type="submit" text="Register" disabled={isButtonDisabled} />
        </form>

        {/* Link to navigate back to the login page */}
        <div className="mt-4 text-center">
          Back to{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
