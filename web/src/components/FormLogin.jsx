import axios from "axios";
import React, { useState } from "react";

const FormLogin = ({ setChangeInput, changeInput }) => {
  const initialState = {
    email: "",
    password: "",
  };
  const [userLogin, setlogin] = useState(initialState);
  const [error, setError] = useState("");
  const handleChanngeInput = (e) => {
    const { value, name } = e.target;
    setlogin({ ...userLogin, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userLogin.email === "" || userLogin.password === "") {
      setError("User or password invalid");
      return setTimeout(() => {
        setError("");
      }, 2000);
    }
    const res = await axios.get("http://localhost:3000/users");
    const users = res.data;
    for (const user of users) {
      if (
        user.email == userLogin.email &&
        user.password == userLogin.password
      ) {
        window.location.href = "/";
        localStorage.setItem("auth", "true");
        return;
      }
    }
  };
  return (
    <div className="card login">
      {error && <div className="card error">{error}</div>}
      <form action="" onSubmit={handleSubmit}>
        <h1>Login</h1>
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
        <input className="btnLogin" type="submit" value="Login" />
      </form>
      <button onClick={() => setChangeInput(!changeInput)}>
        Change to register
      </button>
    </div>
  );
};

export default FormLogin;
