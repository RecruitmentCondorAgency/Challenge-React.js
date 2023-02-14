import React from "react";
import { BiSearch } from "react-icons/bi";
import { IconContext } from "react-icons";

const FormSearch = ({ setUniversity, university, universities }) => {
  return (
    <div className="search">
      <input
        type="text"
        list="data"
        placeholder="University name"
        id="inputSearch"
        name="university"
        value={university}
        onChange={(e) => setUniversity(e.target.value)}
      />
      <button id="btnSearch">
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <BiSearch />
        </IconContext.Provider>
      </button>

      <datalist id="data">
        {universities.map((university) => (
          <option value={university.name} />
        ))}
      </datalist>
    </div>
  );
};

export default FormSearch;
