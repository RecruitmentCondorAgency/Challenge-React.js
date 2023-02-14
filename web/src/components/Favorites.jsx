import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { myFaboritesAtom } from "../../App";
import UniversityDelete from "./UniversityDelete";
import { v4 as uuid } from "uuid";
import getFavorites from "../services/getFavorites";

const Favorities = () => {
  const [myFaborites, setMyFavorites] = useAtom(myFaboritesAtom);

  useEffect(() => {
    getFavorites(setMyFavorites);
    return () => {};
  }, []);

  return (
    <div style={{ paddingRight: "2rem" }}>
      <h1 className="title">My favorites</h1>
      {myFaborites.length === 0 ? (
        <div className="card university">
          <h1 className="universityName" style={{ textAlign: "center" }}>
            There are no favorites
          </h1>
        </div>
      ) : (
        myFaborites.map((university) => (
          <UniversityDelete
            university={university}
            setFavorites={setMyFavorites}
            favorites={myFaborites}
            key={uuid()}
          />
        ))
      )}
    </div>
  );
};

export default Favorities;
