import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router";

import "./index.css";
import { arrayDeleteItem } from "../../utils/utils";
import ProfileCard from "./PorfileCard";
import ProfileData from "./ProfileData";

function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [selected, setSelected] = useState();


  const [loading, setLoading] = useState(false);

  const fetchUser = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/users/${localStorage.getItem("id")}`,
    })
      .then(function (response) {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchUser();
  }, []);

  const deleteCollege = (item) => {
    axios({
      method: "get",
      url: `http://localhost:3000/users/${localStorage.getItem("id")}`,
    })
      .then(function (response) {
        response.data.universities = arrayDeleteItem(
          response.data.universities,
          item
        );

        axios({
          method: "put",
          url: `http://localhost:3000/users/${localStorage.getItem("id")}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(response.data),
        }).then(() => {
          fetchUser();
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const selectCollege = (item) => {
    setSelected(item)
  }
  return (
    <div>
      <Header logged={true} />
      {data && (
        <>
          <div className="Profile__grid">
            <div className="Profile__favorites">
              <p className="Profile__title">Favorites</p>
              <div>
                {data &&
                  data?.universities?.map((college) => {
                    return (
                      <ProfileCard
                        key={college.name}
                        college={college} 
                        deleteCollege={deleteCollege}
                        selectCollege={selectCollege}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="Profile__college-data">
              {selected && <ProfileData selected={selected}/>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
