import React, { useState } from "react";
import "./index.css";

import axios from "axios";

import Header from "../../components/Header";
import Loader from "../../components/Loader";
import ErrorCard from "../../components/ErrorCard";
import SuccesCard from "../../components/SuccesCard";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(0);
  const [success, setSuccess] = useState(false);

  const postUser = (n) => {
    const data = {
      name,
      email,
      password: pass,
      universities: [],
    };

    axios({
      method: "post",
      url: `http://localhost:3000/users`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    }).then(() => {
      setSuccess(true);
    });
  };

  const dataIsOk = () => {
    setError(0);
    setSuccess(false);
    if (name.length > 0 && email.length > 0 && pass.length > 0) {
      axios({
        method: "get",
        url: `http://localhost:3000/users?email=${email}`,
      }).then((response) => {
        if (response.data.length > 0) {
          setError(2);
        } else {
          postUser();
        }
      });
    } else {
      setError(1);
    }
  };

  return (
    <div className="Register__container">
      <Header logged={false} />
      <div className="Login__container">
      {!success &&         <div className="Login__form">
          <p>Register</p>
          <p className="Login__label">Name</p>
          <input
            type="text"
            className="Login__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="Login__label">Email</p>
          <input
            type="text"
            value={email}
            className="Login__input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="Login__label">Password</p>
          <input
            type="password"
            value={pass}
            className="Login__input"
            onChange={(e) => setPass(e.target.value)}
          />

          <div
            className="Login_button"
            onClick={() => dataIsOk()}
          >
            Login →
          </div>
        </div>}
        {error === 1 && <ErrorCard msg="Fill all the fields" />}
        {error === 2 && <ErrorCard msg="Email already registered" />}
        {success && (<SuccesCard msg="Account registered successfully, please login" />)}
      </div>
    </div>
  );
}

export default Register;
