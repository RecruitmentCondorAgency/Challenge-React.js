import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./University.css";
import CardContainer from "../../components/card/Card";
import Header from "../../containers/Header/header";

interface UniversityData {
  country: string;
  domains: string;
  title: string;
  webPages: string;
  state: string;
  alpha: string;
}

const University: React.FC = () => {
  const [universityValue, setUniversityValue] = useState<UniversityData[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const data: UniversityData = location.state;

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:3031/favorites`);

      const resData: UniversityData[] = await response.json();
      const filteredOutdata = resData.filter((el) => el.userId === userId);
      const uniqueFavorites = Array.from(
        new Set(filteredOutdata.map((item) => item.title))
      ).map((title) => {
        return filteredOutdata.find((item) => item.title === title)!;
      });
      setUniversityValue(uniqueFavorites);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          marginTop: 80,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
        className="container__university"
      >
        <div className="first">
          <div className="title_text">
            <h1>My favorites</h1>
          </div>
          <div className="card__container">
            {loading && <p>Loading ....</p>}
            {universityValue.length === 0 && <p>No Favorites Available</p>}
            {universityValue.length >= 0 &&
              universityValue.map((item, index) => (
                <div className="card__item" key={index}>
                  <CardContainer universityValue={item} yellow={true} />
                </div>
              ))}
          </div>
        </div>
        <div className="second">
          <div className="title_text">
            <h1>Selected university</h1>
          </div>
          <Card sx={{ maxWidth: 500, marginTop: 8 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <h3 className="university_name">{data.title}</h3>
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography variant="body2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Typography>
            </CardContent>
            <CardActions>
              Website:{" "}
              <Button size="small">
                <a href={data?.webPages}>{data.webPages.substring(8)}</a>
              </Button>
            </CardActions>
            <CardActions>
              Location: <Button size="small">{data.country}</Button>
            </CardActions>
            <CardActions>
              Country's capital: <Button size="small">{data.state}</Button>
            </CardActions>
            <CardActions>Currency:</CardActions>
            <CardActions>Language: Name</CardActions>
            <CardActions>Population: 999999999999</CardActions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default University;
