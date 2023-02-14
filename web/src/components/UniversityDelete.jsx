import axios from "axios";
import { useAtom } from "jotai";
import React from "react";
import { IconContext } from "react-icons";
import { BiStar } from "react-icons/bi";
import { RiShareBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const UniversityDelete = ({ university, favorites, setFavorites }) => {
  const handleFavorite = () => {
    if (!university.id) return;
    axios
      .delete(`http://localhost:3000/favorites/${university.id}`)
      .then()
      .catch((error) => {
        console.log(error);
      });
    setFavorites(favorites.filter((favorite) => favorite.id !== university.id));
  };
  return (
    <div className="card university">
      <div className="universityHeader">
        <div className="head">
          <h1 className="universityName">{university.name}</h1>
          <label htmlFor="" className="universityCountry">
            {university.country}
          </label>
        </div>
        <div>
          <button
            style={{
              backgroundColor: "#fff",
              border: "none",
              paddingRight: ".5rem",
            }}
            onClick={handleFavorite}
          >
            <IconContext.Provider
              value={{ className: "react-icons-favorite", size: "1.5rem" }}
            >
              <BiStar />
            </IconContext.Provider>
          </button>
          <Link
            to="/profile"
            state={{ university: university }}
            style={{ backgroundColor: "#fff", border: "none" }}
          >
            <IconContext.Provider
              value={{ className: "react-icons", size: "1.5rem" }}
            >
              <RiShareBoxFill />
            </IconContext.Provider>
          </Link>
        </div>
      </div>
      <p className="universityDescription">{university.domains}</p>
    </div>
  );
};

export default UniversityDelete;
