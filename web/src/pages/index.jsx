import axios from "axios";
import React, { useEffect, useState } from "react";
import FormSearch from "../components/FormSearch";
import University from "../components/University";
import { v4 as uuid } from "uuid";
import { useAtom } from "jotai";
import extractName from "../utils/extractName";
import UniversityDelete from "../components/UniversityDelete";
import { myFaboritesAtom } from "../../App";

const HomePage = () => {
  const [faborites, setMyFavorites] = useAtom(myFaboritesAtom);
  const [universities, setUniversities] = useState([]);
  const [university, setUniversity] = useState("");
  useEffect(() => {
    getFavorites();
  }, [university]);
  const getUniversities = async () => {
    
    setTimeout(() => {
      axios
        .get(`http://universities.hipolabs.com/search?name=${university}`)
        .then((res) => {
          let universitiesData = [];
          for (let index = 0; index < 8; index++) {
            const element = res.data[index];

            element.status = true;
            if (element) {
              universitiesData.push(element);
            }
          }
          setUniversities(universitiesData);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  };
  const getFavorites = async () => {
    axios.get("http://localhost:3000/favorites").then((result) => {
      const data = extractName(result.data);
      setMyFavorites(data);
    });
  };

  useEffect(() => {
    getUniversities();
  }, [university, faborites]);
  if (localStorage.getItem("auth") !== "true") window.location = "/login";
  return (
    <div id="home">
      <FormSearch
        setUniversity={setUniversity}
        university={university}
        universities={universities}
      />
      {universities.length === 0 ? (
        <div className="card university">
          <h1 className="universityName" style={{ textAlign: "center" }}>
            Loading...
          </h1>
        </div>
      ) : (
        universities.map((university) => {
          {
            return faborites.includes(university.name) ? (
              <UniversityDelete
                university={university}
                key={uuid()}
                setFavorites={setMyFavorites}
                favorites={faborites}
              />
            ) : (
              <University
                university={university}
                key={uuid()}
                setFavorites={setMyFavorites}
                favorites={faborites}
              />
            );
          }
        })
      )}
    </div>
  );
};

export default HomePage;
