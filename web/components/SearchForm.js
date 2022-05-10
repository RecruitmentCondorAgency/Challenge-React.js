import React, { useState, useEffect } from "react";
import axios from "axios";

const baseurl = "http://localhost:3000/universities";

export default function SearchForm() {
  const [search, setSearch] = useState([]); //Static Data
  const [staticSearch, setstaticSearch] = useState([]); //Dinamic Data
  const [find, setfind] = useState(""); //Search Control

  const req = async () => {
    await axios
      .get(baseurl)
      .then((response) => {
        setSearch(response.data);
        setstaticSearch(response.data);
        //console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setfind(event.target.value);
    filtered("Busqueda "+event.target.value);
  }

  const filtered = (endFind) => {
    var searchResults = staticSearch.filter((elemento) => {
      if(elemento.name.toString().toLowerCase().includes(endFind.toLowerCase())
      || elemento.country.toString().toLowerCase().includes(endFind.toLowerCase())) {
        return elemento;
      }
    });
    setSearch(searchResults);
  }

  useEffect(() => {
    req();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-3">
        <div className="col-12 mb-5">
          <div className="mb-3 col-4 mx-auto text-center">
            <label className="form-label h4">Search</label>
            <input type="text" className="form-control" placeholder="Search by Name and Country" value={find} onChange={handleChange} />
          </div>
        </div>
      </div>

      <table className="table table-primary">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Webpages</th>
            <th>Domains</th>
          </tr>
        </thead>
        <tbody>
          {search.map((search) => (
            <tr key={search.name}>
              <td>{search.name}</td>
              <td>{search.country}</td>
              <td>{search.web_pages}</td>
              <td>{search.domains}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
