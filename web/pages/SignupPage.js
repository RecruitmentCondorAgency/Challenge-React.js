import React, { useRef } from "react";
import figure from "../public/OIP.jpeg";

export default function SignupPage() {
    
  return (

    <div className="container">
      <div className="jumbotron mt-5 mx-auto">
        <h1 className="display-5">
          <i className="fa fa-registered" /> User Register
        </h1>
        <p className="lead">
          <i className="fa fa-info-circle" /> Fill form and Register your User
          in the System.
        </p>
        <div className="row">
          <div className="col-md-6 mt-3 mb-3">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-arrow-circle-down" /> User Register
              </div>
              <div className="card-body">
                <form action>
                  <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      id="fullname"
                      className="form-control"
                      placeholder="full name"
                      ref={refUser}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      placeholder="username"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="repassword">Repeat password</label>
                    <input
                      type="password"
                      name="repassword"
                      id="repassword"
                      className="form-control"
                      placeholder="re-type password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="email"
                      required
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="">Gender</label>
                    <br />
                    <label htmlFor="male">He</label>
                    <input type="radio" name="gender" id="male" />
                    <label htmlFor="female">She</label>
                    <input type="radio" name="gender" id="female" />
                  </div>
                  <button
                    type="submit"
                    onClick={handleRegister}
                    className="btn btn-primary btn-block btn-lg mt-3"
                  >
                    <i className="fa fa-arrow-circle-down" /> Register
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-3 mb-3">
            <div className="card-header">
              <i className="fa fa-address-card" aria-hidden="true" /> 
              Best Universities
            </div>
            <div className="card card-body text-center">
              <img src={figure} alt="figure" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
