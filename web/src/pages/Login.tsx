import React, { useState } from "react";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import { Navbar } from "../components/Navbar";
import { getUsers } from "../services/api.services";
// import { UserModel } from "../models/User.model";
import { useNavigate } from 'react-router-dom';
import { UserModel } from "../models/user.model";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica de autenticación
    // o enviar los datos a un servidor
    console.log("Email:", email);
    console.log("Password:", typeof (password));
    getUsers().then((result: UserModel[]) => {
      console.log(result);
      result.map(({ email: email2, password: password2 }) => {
        if (email == email2 && password == password2) {
          navigate('/profile')
        } else {
          setShowMessage(true)
        }
      })

    });
  };
  
  return (
    <div>
      <Navbar items={[{ path: '/search', name: 'Search' }]} />

      <div className="flex justify-center items-center h-screen py-5">
        <div className="bg-white shadow-md rounded-md p-4 w-[500px]">
          {showMessage ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold px-3">¡Informacion!</strong>
            <span className="block sm:inline">Usuario o contraseña incorrectos.</span>
            <button type="button" className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={()=>setShowMessage(false)}>
              <FaTimes />
            </button >
          </div> : <></>}
          
          <form onSubmit={handleSubmit} className="">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                <div className="px-3 w-full flex items-center justify-center">
                  <span className="mx-2">Login</span> <FaArrowRight />{" "}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
