import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Favorites from "../components/Favorites";
import MyUniversity from "../components/MyUniversity";

const ProfilePage = () => {
  const [selectUniversity, setSelectUniversity] = useState({});
  const location = useLocation();
  useEffect(() => {
    const state = location.state;
    if (state) {
      setSelectUniversity(state.university);
    }
  }, []);

  if (localStorage.getItem("auth") !== "true") window.location = "/login";

  return (
    <div className="containerProfile">
      <Favorites />
      <MyUniversity selectUniversity={selectUniversity} />
    </div>
  );
};

export default ProfilePage;
