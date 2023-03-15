import React, { useEffect, useState } from "react";
import getCountry from "../services/getCountry";
import getCurrency from "../services/getCurrency";
import getLanguage from "../services/getLanguage";
import getSymbol from "../services/getSymbol";

const MyUniversity = ({ selectUniversity }) => {
  const [country, setCountry] = useState({});
  const [symbol, setSymbol] = useState("");
  const [currency, setCurrency] = useState("");
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    if (Object.entries(selectUniversity).length === 0) return;
    getCountry(setCountry, selectUniversity);
  }, [selectUniversity]);
  useEffect(() => {
    getCurrency(setCurrency, country);
    getSymbol(setSymbol, country);
    getLanguage(setLanguages, country);
  }, [country]);

  return (
    <div>
      <h1 className="title">Selected university</h1>
      {Object.entries(selectUniversity).length === 0 ? (
        <div className="card university">
          <h1 className="universityName" style={{ textAlign: "center" }}>
            No university selected
          </h1>
        </div>
      ) : (
        <div className="card myUniversity">
          <h1>{selectUniversity.name}</h1>
          <p style={{ padding: "1rem 0" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quam,
            nesciunt tempore doloribus illum deserunt optio corrupti qui dolorem
            laboriosam iusto minima quos aliquam, illo nobis sapiente ab nihil
            doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Vel temporibus a beatae officia nulla sed magni ipsum pariatur
            accusantium, nobis et ratione, dicta quasi voluptate amet corporis
            quae suscipit aspernatur!
          </p>
          <p style={{ padding: "1rem 0" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quam,
            nesciunt tempore doloribus illum deserunt optio corrupti qui dolorem
            laboriosam iusto minima quos aliquam, illo nobis sapiente ab nihil
            doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Vel temporibus a beatae officia nulla sed magni ipsum pariatur
            accusantium, nobis et ratione, dicta quasi voluptate amet corporis
            quae suscipit aspernatur!
          </p>
          <p style={{ padding: "1rem 0" }}>
            Website: {selectUniversity.domains}
          </p>
          <p style={{ padding: "1rem 0" }}>
            Location: {selectUniversity.country}
          </p>
          <p style={{ padding: "1rem 0" }}>
            Country's capital: {selectUniversity.country}
          </p>
          <p style={{ padding: "1rem 0" }}>
            Currency: {currency} ({symbol})
          </p>
          <p style={{ padding: "1rem 0" }}>
            Language:{" "}
            {languages.map((language) => (
              <>{language}, </>
            ))}
          </p>
          <p style={{ padding: "1rem 0" }}>Population: {country.population}</p>
        </div>
      )}
    </div>
  );
};

export default MyUniversity;
