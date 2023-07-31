import * as React from "react";
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { AuthContext } from "../../providers/auth.provider";
import * as classes from "./SearchPage.styles";
import axios from "axios";
import { universityService } from "../../services";

export function SearchPage() {
  const [inputValue, setInputValue] = React.useState("");
  const [inputValueSearch, setInputValueSearch] = React.useState("");
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");
  const [universities, setUniversities] = React.useState([]);
  const [universitiesFound, setUniversitiesFound] = React.useState([]);

  const auth = React.useContext(AuthContext);
  const { universities: favUniversities, user } = auth;

  const getUniversities = async (param: string) => {
    return await universityService.getUniversities(param);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  React.useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 1000);
    return () => clearTimeout(delayInputTimeoutId);
  }, [inputValue, 1000]);

  React.useEffect(() => {
    setDebouncedInputValue(inputValueSearch);
  }, [inputValueSearch]);

  React.useEffect(() => {
    const getData = async (param: string) => {
      if (param.length === 0) {
        return [];
      }
      return await getUniversities(debouncedInputValue);
    };
    getData(debouncedInputValue).then((data) => {
      setUniversities(data);
      setUniversitiesFound(data);
    });
  }, [debouncedInputValue]);

  const handleSearch = async () => {
    const data = await getUniversities(
      inputValueSearch ? inputValueSearch : debouncedInputValue
    );
    setUniversitiesFound(data);
  };

  const handleFav = async (university) => {
    await auth.saveNewFav({ ...university, userId: user.id });
  };

  return (
    <Container style={{ ...classes.PageContainer, flexDirection: "column" }}>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <Autocomplete
            freeSolo
            id="university search"
            disableClearable
            options={universities.map((option) => option.name)}
            onChange={(event, newValue) => {
              setInputValueSearch(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="University name..."
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  value: inputValue,
                  onChange: handleInputChange,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            style={{ height: "100%" }}
            onClick={() => handleSearch()}
          >
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
      <Container style={{ ...classes.ListContainer, flexDirection: "column" }}>
        {universitiesFound.length === 0 && (
          <Grid container spacing={2}>
          <Grid item xs={12} style={classes.UniversityCardContainer}>
            <Container style={classes.UniversityCard}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h6">
                    Couldn't find any university, please enter another filter
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
        )}
        {universitiesFound.map((university, index) => (
          <Grid container spacing={2} key={index}>
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
                  {user && (
                    <Grid item xs={1} style={{ cursor: "pointer" }}>
                      {favUniversities.includes(university.name) ? (
                        <StarIcon />
                      ) : (
                        <StarBorderIcon onClick={() => handleFav(university)} />
                      )}
                    </Grid>
                  )}
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
    </Container>
  );
}
