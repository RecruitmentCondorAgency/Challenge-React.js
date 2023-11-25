import * as React from 'react';
import { useEffect, useState } from "react";
import { TextField, Button, Autocomplete } from "@mui/material";
// import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";

import "./Dashboard.css";
import CardContainer from "../../components/card/Card";
import Header from "../../containers/Header/header";
import { useNavigate } from "react-router-dom";
import { request } from '../../api/requestAction';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';

const Dashboard = () => {
  const [value, setValue] = useState(null);
  const [serachResult, setSearchResult] = useState([]);
  const [currentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [universityValue, setUniversityValue] = useState([]);
  const [starData, setStarData] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await request({
        baseUrl: 'http://universities.hipolabs.com',
        endPoint: '/search',
        header: { 'Content-Type': 'application/json' },
      });
      const mappedResData = response.map((item) => {
        return {
          country: item.country,
          domains: item.domains[0],
          title: item.name,
          webPages: item.web_pages[0],
          state: item["state-province"],
          alpha: item.alpha_two_code,
        };
      });
      setUniversityValue(mappedResData);
      setLoading(false);
      console.log("called");
    };
    fetchData();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchStarData = async () => {
      const response = await fetch(`http://localhost:3031/favorites`);
      const resData = await response.json();
      const filteredOutdata = resData.filter((el) => el.userId === userId);
      setStarData(filteredOutdata);
    };
    fetchStarData();
  }, []);

  let currentItems;

  if (serachResult.length > 0) {
    currentItems = serachResult;
  } else if (serachResult.length <= 0) {
    currentItems = universityValue.slice(indexOfFirstItem, indexOfLastItem);
  }

  const handleClick = (item) => {
    navigate("/university", { state: item });
  };

  const handleStarClick = (event, item) => {
    event.stopPropagation();
    const userId = localStorage.getItem("userId");
    const favoriteItem = {
      userId: userId,
      status: true,
      ...item,
    };
    fetch("http://localhost:3031/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favoriteItem),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const handleOpenApp = (event) => {
    event.stopPropagation();
  };
  const fields = { value: 'Game' };

  console.log("currentItems", currentItems)
  return (
    <React.Fragment>
      <Header />
      <div className="dashboard__container">
        <div className="dashboard__input_main">
          <div className="dashboard__container_input">
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setSearchResult(newValue ? [newValue] : []);
                if (typeof newValue === "string") {
                  setValue({
                    title: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  setValue({
                    title: newValue.inputValue,
                  });
                } else {
                  setValue(newValue);
                }
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={universityValue}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.title;
              }}
              renderOption={(props, option) => (
                <React.Fragment>
                  <li style={{backgroundColor:'white', paddingLeft: '15%'}} {...props}>{option.title}</li>
                </React.Fragment>
              )}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="University name" />
              )}
            />
          </div>
          <div className="input__button">
            <Button variant="contained">
              <SearchIcon fontSize="large" />
            </Button>
          </div>
        </div>
        <div className="card__container">
          {currentItems.length > 0 && currentItems.map((item, index) => (
            <div className="card__item">
              <CardContainer
                universityValue={item}
                onStarClick={(event) => handleStarClick(event, item)}
                onClick={() => handleClick(item)}
                onOpenAppClick={handleOpenApp}
                currentItems={currentItems}
                starData={starData}
              />
            </div>
          ))}
        </div>
        <div>{loading && <p className="loading">Loading...</p>}</div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
