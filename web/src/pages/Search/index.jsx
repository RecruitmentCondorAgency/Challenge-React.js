import React, { useState } from "react";
import Header from "../../components/Header";
import axios from "axios";

import "./index.css";
import Loader from "../../components/loader";
import SuccesCard from "../../components/SuccesCard";
import CollegeCard from "./CollegeCard";

function Search() {
  const [searchWords, setSearchWords] = useState("");
  const [data, setData] = useState();
  const [success, setSuccess] = useState();

  const [loading, setLoading] = useState(false);

  const addCollege = (item) => {
    axios({
      method: "get",
      url: `http://localhost:3000/users/${localStorage.getItem('id')}`,
    }).then(function (response) {
        let data = response.data

        data.universities.push(item)
        axios({
          method: "put",
          url: `http://localhost:3000/users/${localStorage.getItem('id')}`,
          headers: {
            'Content-Type': 'application/json'
        },
        data : JSON. stringify(data)
        }).then((response) => {addedData(item.name)})
    }).catch((err) => {
      console.log(err)
    });
  }

  const addedData = (item) => {
    setSuccess(item)
    setData()
    setSearchWords("")
  }

  const searchInit = () => {
    setSuccess(false)
    setLoading(true);
    
    axios({
      method: "get",
      url: `http://universities.hipolabs.com/search?name=${searchWords}`,
    }).then((response) => {
        setData(response.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err)
    });
  };


  return (
    <div className="Search__body">
      {loading && <Loader />}
      <Header logged={true} />
      <div className="Search__container">
        <input
          type="text"
          value={searchWords}
          onChange={(e) => setSearchWords(e.target.value)}
          className="Search__input"
        />
        <btn onClick={searchInit} className="Search__btn">
          Buscar
        </btn>
        {data && <p>Numero de coincidencias: {data.length}</p>}
        {data &&
          data?.map((college) => <CollegeCard college={college} addCollege={addCollege}/>)
          }
        <div></div>
      </div>
      {success && <SuccesCard msg="University added"/>}
    </div>
  );
}

export default Search;
