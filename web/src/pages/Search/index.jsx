import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";

import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import "./index.css";
import Loader from "../../components/loader";
import SuccesCard from "../../components/SuccesCard";
import CollegeCard from "./CollegeCard";

function Search() {
  const [searchWords, setSearchWords] = useState("");
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState()
  const [success, setSuccess] = useState();

  const [loading, setLoading] = useState(false);

  const fetchCollege = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `http://universities.hipolabs.com/search?name=${searchWords}`,
    }).then((response) => {setData(response.data)
      setLoading(false);
    }).catch((err) => {
      console.log(err)
    });
  }

  useEffect(() => {
    fetchCollege()
  }, [])
  

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
    setFilteredData()
    setSearchWords("")
  }

  const searchInit = (string, result) => {
    setFilteredData(result)
    setSuccess(false)
  };

  const handleOnSelect = (item) => {
    setFilteredData([item])
  }


  return (
    <div className="Search__body">
      {loading && <Loader />}
      <Header logged={true} />
      <div className="Search__container">
        <ReactSearchAutocomplete
            items={data}
            onSearch={searchInit}
            onSelect={handleOnSelect}
          />
        {filteredData &&
          filteredData?.map((college) => <CollegeCard college={college} addCollege={addCollege}/>)
          }
        <div></div>
      </div>
      {success && <SuccesCard msg="University added"/>}
    </div>
  );
}

export default Search;
