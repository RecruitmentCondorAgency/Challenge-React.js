import axios from "axios";
import React, { useState } from "react";

const FormRegister = ({ setChangeInput, changeInput }) => {
  const initialState = {
    email: "",
    password: "",
  };
  const [error, setError] = useState("");
  const [userLogin, setlogin] = useState(initialState);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userLogin.email === "" || userLogin.password === "") {
      setError("User or password invalid");
      return setTimeout(() => {
        setError("");
      }, 2000);
    }
    axios
      .post("http://localhost:3000/users", {
        email: userLogin.email,
        password: userLogin.password,
      })
      .then(() => {
        window.location.href = "/";
        localStorage.setItem("auth", "true");
        return;
      })
      .catch(() => {
        setError("Error on resgister user");
        return setTimeout(() => {
          setError("");
        }, 2000);
      });
  };
  const handleChanngeInput = (e) => {
    const { value, name } = e.target;
    setlogin({ ...userLogin, [name]: value });
  };
  return (
    <div className="card login">
      {error && <div className="card error">{error}</div>}
      <form action="" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="groupForm">
          <label htmlFor="">Correo</label>
          <input type="email" onChange={handleChanngeInput} name="email" />
        </div>
        <div className="groupForm">
          <label htmlFor="">Contraseña</label>
          <input
            type="password"
            onChange={handleChanngeInput}
            name="password"
          />
        </div>
        <input className="btnLogin" type="submit" value="Register" />
      </form>
      <button onClick={() => setChangeInput(!changeInput)}>
        Change to login
      </button>
    </div>
  );
};

export default FormRegister;
