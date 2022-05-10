import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function ProfilePage() {
  return (
    <div className="container">
      <div className="jumbotron mt-5 mx-auto">
        <h1 className="display-5">Student Profile {cookies.get("fullname")}</h1>
        <hr className="my-4" />
        <div className="row">
          <div className="col-md-6 mt-3 mb-3">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-arrow-circle-down" /> My Favorites
              </div>
              <div className="card-body">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">University of Texas</h4>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="card-link">
                      Card link
                    </a>
                    <a href="#" className="card-link">
                      Another link
                    </a>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Univeridad de Buenos Aires</h4>

                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="card-link">
                      Card link
                    </a>
                    <a href="#" className="card-link">
                      Another link
                    </a>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Cambridge University</h4>

                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="card-link">
                      Card link
                    </a>
                    <a href="#" className="card-link">
                      Another link
                    </a>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Toronto University</h4>

                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="card-link">
                      Card link
                    </a>
                    <a href="#" className="card-link">
                      Another link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-3 mb-3">
            <div className="card-header">
              <i className="fa fa-arrow-circle-down" /> Selected Universities
            </div>
            <div className="card-body">
              <div
                className="text-white bg-primary mb-3"
                style={{ maxWidth: "auto", maxHeight: "auto" }}
              >
                <div className="card-body">
                  <h4 className="card-title">University of Toronto</h4>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fusce vestibulum lectus a ipsum commodo porta. Quisque at
                    tortor ultricies massa gravida placerat quis non est. Nam ac
                    lectus quis massa maximus maximus et nec lectus. Morbi
                    ornare sapien eget laoreet laoreet. Donec placerat purus nec
                    nibh laoreet imperdiet. In in augue id est dapibus
                    ullamcorper ac ac enim. In sit amet dui molestie nisl mattis
                    rhoncus at in libero. Sed tristique nisi non turpis
                    hendrerit, ut eleifend sem faucibus. Morbi id urna ut sem
                    imperdiet hendrerit. Maecenas aliquam turpis vel elit
                    rhoncus, id maximus erat condimentum. Proin tincidunt leo ac
                    pharetra pharetra. Nulla a nunc sed erat aliquam consequat
                    quis quis eros. Sed ullamcorper urna posuere erat luctus
                    commodo. Proin rhoncus lectus sit amet dolor condimentum, ut
                    condimentum sapien euismod.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
