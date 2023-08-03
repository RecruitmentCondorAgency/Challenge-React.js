import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Navbar } from "./Navbar";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica de autenticación
    // o enviar los datos a un servidor
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <div>
      <Navbar items={[{path:'/search', name: 'Search'}]}/>

      <div className="center-login">
        <div className="bg-white shadow-md rounded-md p-4">
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
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
