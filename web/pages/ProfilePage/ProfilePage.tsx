import * as React from "react";
import { AuthContext } from "../../providers/auth.provider";
import { Link, useNavigate } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import * as classes from "./ProfilePage.styles";
import { universityService } from "../../services/universities.service";

export function ProfilePage() {
  const auth = React.useContext(AuthContext);
  const { universitiesFull: favUniversities } = auth;

  const [selectedUniversity, setSelectedUniversity] = React.useState(null);
  const [selectedCountry, setSelectedCountry] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (auth.user === null) {
      return navigate("/login");
    }
  }, []);

  const handleFav = async (university) => {
    await auth.deleteFav(university);
  };

  const handleSelected = async (university) => {
    setSelectedUniversity(university);
    const countryData = await universityService.getUniversityCountry(
      university.alpha_two_code
    );
    setSelectedCountry(countryData[0]);
  };
  
  return (
    <Container style={{ ...classes.PageContainer, flexDirection: "column" }}>
      <Grid container>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h3"
              color="#0072e1"
              align="center"
            >
              My Favorites
            </Typography>
          </Grid>
          <Container
            style={{
              ...classes.ListContainer,
              flexDirection: "column",
              height: "100%",
            }}
          >
            {favUniversities.length === 0 && (
              <Grid
                container
                spacing={2}
                style={{ cursor: "pointer" }}
              >
                <Grid item xs={12} style={classes.UniversityCardContainer}>
                  <Container style={classes.UniversityCard}>
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography component="h1" variant="h6">
                          Please <Link to="/search">search universities</Link>{" "}
                          to add to your favorites
                        </Typography>
                      </Grid>
                    </Grid>
                  </Container>
                </Grid>
              </Grid>
            )}
            {favUniversities.map((university, index) => (
              <Grid
                container
                spacing={2}
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => handleSelected(university)}
              >
                <Grid item xs={12} style={classes.UniversityCardContainer}>
                  <Container style={classes.UniversityCard}>
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography component="h1" variant="h6">
                          {`${university.name.substring(0, 50)} ${
                            university.name.length > 50 ? "..." : ""
                          }`}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography component="p">
                          {university.alpha_two_code}
                        </Typography>
                      </Grid>
                      <Grid item xs={1} style={{ cursor: "pointer" }}>
                        <StarIcon onClick={() => handleFav(university.id)} />
                      </Grid>
                      <Grid item xs={12} style={{ marginTop: "1rem" }}>
                        <Typography component="p">
                          {`${university.name} located in ${university.country}`}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} style={{ marginTop: "1rem" }}>
                        {university.web_pages[0] && (
                          <Typography component="p">
                            Visit University Web Page:{" "}
                            <a href={university.web_pages[0]} target="_blank">
                              Click Here
                            </a>
                          </Typography>
                        )}
                        {!university.web_pages[0] && (
                          <Typography component="p">
                            This university doesn't have a web page
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Container>
                </Grid>
              </Grid>
            ))}
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h3"
              color="#0072e1"
              align="center"
            >
              Selected University
            </Typography>
          </Grid>
          <Container
            style={{
              ...classes.ListContainer,
              flexDirection: "column",
              height: "100%",
              justifyContent: "start",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} style={classes.UniversityCardContainer}>
                <Container
                  style={{ ...classes.UniversityCard, marginTop: "5rem" }}
                >
                  <Grid container>
                    <Grid item xs={12}>
                      {selectedUniversity === null && (
                        <Typography>Please select an university...</Typography>
                      )}
                      {selectedUniversity !== null && (
                        <>
                          <Typography component="h1" variant="h4">
                            {selectedUniversity.name}
                          </Typography>
                          {selectedUniversity.web_pages[0] && (
                            <>
                              <br />
                              <Typography component="p">
                                <b>Website:</b>{" "}
                                <a
                                  href={selectedUniversity.web_pages[0]}
                                  target="_blank"
                                >
                                  {selectedUniversity.web_pages[0]}
                                </a>
                              </Typography>
                            </>
                          )}
                          <br />
                          <Typography component="p">
                            <b>Location:</b>{" "}
                            <a
                              href={selectedCountry?.maps.googleMaps}
                              target="_blank"
                            >
                              {selectedCountry?.name.official}
                            </a>
                          </Typography>
                          <br />
                          <Typography component="p">
                            <b>Country's Capital: </b>
                            <a
                              href={selectedCountry?.maps.googleMaps}
                              target="_blank"
                            >
                              {selectedCountry?.capital[0]}
                            </a>
                          </Typography>
                          <br />
                          <Typography component="p">
                            <b>Currency: </b>{" "}
                            {selectedCountry &&
                              Object.keys(selectedCountry.currencies).map(
                                (item, index) =>
                                  index === 0
                                    ? `${selectedCountry.currencies[item].name} (${selectedCountry.currencies[item].symbol})`
                                    : `, ${selectedCountry.currencies[item].name} (${selectedCountry.currencies[item].symbol})`
                              )}
                          </Typography>
                          <br />
                          <Typography component="p">
                            <b>Language: </b>
                            {selectedCountry &&
                              Object.keys(selectedCountry.languages).map(
                                (item, index) =>
                                  index === 0
                                    ? `${selectedCountry.languages[item]}`
                                    : `, ${selectedCountry.languages[item]}`
                              )}
                          </Typography>
                          <br />
                          <Typography component="p">
                            <b>Population: </b>
                            {selectedCountry && selectedCountry.population}
                          </Typography>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Container>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}
