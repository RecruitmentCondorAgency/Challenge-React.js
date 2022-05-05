import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5 text-center">
          <div className="card">
            <h1>Ooops!!!</h1>
            <h2>404 - Page not found!</h2>
            <div className="card-body">
              <Link to="/" className="btn btn-primary btn-lg btn-block">
                <i className="fa fa-home" /> Go to the Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
