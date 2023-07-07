import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { login } from "../helpers/connexion";
import AppContext from "../context/AppContext";
import { User } from "../types/types";
import { useNavigate } from "react-router-dom";

export const useForm = () => {
  const { updateUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<String>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await login(formData);
    if (user) {
      setError("");
      updateUser(user);
      navigate("/profile");
    } else {
      setError("Los datos son incorrectos. Intenta de nuevo");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return {
    formData,
    error,
    handleSubmit,
    handleChange,
  };
};

