import { useCallback, useState } from "react";
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

  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
      }));
    },
    [setCredentials]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const response = await registerUserAPI(credentials);
      if(response) {
        showToast(toastType.success, "User created successfully");
        navigate("/login");
      } else {
        showToast(toastType.error, "Something went wrong");
      }
    },
    [credentials, showToast, navigate]
  );

  const isButtonDisabled = !(
    credentials.email.trim() !== "" && credentials.password.trim() !== ""
  );

  return (
    <div className="sm:flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 shadow-lg h-screen sm:h-auto">
        <form onSubmit={handleSubmit}>
          <TextInput
            name="email"
            type="text"
            placeholder="Enter your email"
            label="Email"
            value={credentials.email}
            onChange={handleInputChange}
          />
          <TextInput
            type="password"
            name="password"
            placeholder="********"
            label="Password"
            value={credentials.email}
            onChange={handleInputChange}
          />
          <Button type="submit" disabled={isButtonDisabled}>Register</Button>
        </form>
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
