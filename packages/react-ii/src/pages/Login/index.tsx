import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { Credentials } from "../../types/user";

const Login: React.FC = () => {
  const auth = useAuth();
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
      auth.login(credentials);
    },
    [auth.login, credentials]
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
          <Button type="submit" disabled={isButtonDisabled}>
            Login
          </Button>
        </form>
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
