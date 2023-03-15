import React, { useState } from "react";
import axios from "axios";

import {  useNavigate } from "react-router-dom";

import "./index.css";

import Header from "../../components/Header";
import Loader from "../../components/loader";
import ErrorCard from "../../components/ErrorCard";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [error, setError] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const initSession = () => {
    setLoading(true);
    setError(true);
    setErrorServer(false);

    axios({
      method: "get",
      url: `http://localhost:3000/users?email=${email}&password=${pass}`,
    })
      .then(function (response) {
        if (response.data.length > 0) {
          setError(false);

          localStorage.setItem("id", response.data[0].id);
          localStorage.setItem("name", response.data[0].name);

          navigate("/search");
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorServer(true);
      });
  };

  return (
    <div className="Login__container">
      {loading && <Loader />}
      <Header logged={false} />
      <div className="Login__form">
        <p className="Login__label">Email</p>
        <input
          type="text"
          name="name"
          className="Login__input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="Login__label">Password</p>
        <input
          type="text"
          name="name"
          className="Login__input"
          onChange={(e) => setPass(e.target.value)}
        />

        <div className="Login_button" onClick={initSession}>
          {" "}
          Login →
        </div>
      </div>
      {error && <ErrorCard msg={"Email or password incorrect"} />}
      {errorServer && <ErrorCard msg={"Server error"}/>}
    </div>
  );
}

export default Login;
