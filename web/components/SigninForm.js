import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';


const baseurl = "http://127.0.0.1:3000/users";
const cookies = new Cookies();

export default function SigninForm() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = (event) => {
    event.preventDefault();
    //console.log(`${data.username} ${data.password}`);
    
  }

  startSession = async () => {
    await axios.get(baseurl, {params: {username: data.username, password: md5(data.password)}})
    .then((response) => {
      //console.log(response.data);
      if(response.data.length>0) {
        let res = response.data[0];
        cookies.set('id', res.id, {path: "/"});
        cookies.set('fullname', res.fullname, {path: "/"});
        cookies.set('email', res.email, {path: "/"});
        alert(`Welcome ${res.fullname}`);
        window.location.href='../profile';
      }else{
       alert("The username or password are incorrects!");
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5">
          <div className="card">
            <div className="card-header">
              <i className="fa fa-arrow-circle-right"></i> Sign In
            </div>
            <div className="card-body">
              <form onSubmit={sendData}>
                <div className="form-group">
                  <label htmlFor="email">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    placeholder="Enter your Username"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg mt-2"
                  onClick={() => startSession()}
                >
                  <i className="fa fa-arrow-circle-right"></i> Signin
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
