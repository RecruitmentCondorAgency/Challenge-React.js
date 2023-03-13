import { FC, useEffect, useMemo, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../providers/auth/auth.hook";
import { UniversityCard } from "../../components/UniversityCard/UniversityCard";
import { withProfileProvider } from "../../providers/profile/profile.hoc";
import { UniversityEntity } from "../../common/entities";
import { Link, useSearchParams } from "react-router-dom";
import { withCountryProvider } from "../../providers/country/country.hoc";
import { useCountry } from "../../providers/country/country.hook";
import { CountryDetailSection } from "./CountryDetail.section";

const UserProfile: FC = () => {
  const [{ loggedUser }] = useAuth();
  const [, setSearchParams] = useSearchParams();
  const hasUniversities = useMemo(
    () => !!loggedUser?.universities && loggedUser.universities.length > 0,
    [loggedUser]
  );
  const [{ country }, { fetchCountryDetails }] = useCountry();
  const [selectedUniversity, setSelectedUniversity] =
    useState<UniversityEntity>();

  const { capital, language, population, currency } = useMemo(() => {
    if (!country) return {};
    const currency = Object.values(country.currencies)[0];
    return {
      currency: `${currency.name} (${currency.symbol})`,
      capital: country.capital?.join(", "),
      language: Object.values(country.languages ?? {}).join(", "),
      population: country.population,
    };
  }, [country]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchName = searchParams.get("selected");

    if (searchName && !selectedUniversity) {
      setSelectedUniversity(
        loggedUser?.universities?.find((x) => x.name === searchName)
      );
    }
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      fetchCountryDetails(selectedUniversity.alpha_two_code);
    }
  }, [selectedUniversity]);

  return (
    <Layout alignItems="flex-start" maxWidth="lg">
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h2"
            sx={{
              color: "#2991E0",
              fontWeight: 800,
              fontSize: "32px",
              lineHeight: "160%",
            }}
          >
            My favourites
          </Typography>
          <Grid item container spacing={2} xs={12} sx={{ marginTop: "10px" }}>
            {!hasUniversities ? (
              <Typography>You have no favourites universities</Typography>
            ) : (
              loggedUser?.universities?.map((university) => (
                <UniversityCard
                  university={university}
                  key={university.name}
                  onClickDetail={() => {
                    setSelectedUniversity(university);
                    setSearchParams(university.name);
                  }}
                  fullWidth
                />
              ))
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h2"
            sx={{
              color: "#2991E0",
              fontWeight: 800,
              fontSize: "32px",
              lineHeight: "160%",
            }}
          >
            Selected university
          </Typography>
          <Grid item sx={{ paddingTop: "10px" }}>
            {!selectedUniversity ? (
              <Typography sx={{ marginTop: "10px" }}>
                You need to select a university to see the detail
              </Typography>
            ) : (
              <Box
                sx={{
                  backgroundColor: "white",
                  marginTop: "10px",
                  width: "100%",
                  padding: "16px 32px",
                  boxShadow:
                    "0px 6px 12px rgba(0, 0, 0, 0.06), 0px 12px 18px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, fontSize: "16px", lineHeight: "160%" }}
                >
                  {selectedUniversity.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: 2,
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "160%",
                    color: "#2C3038",
                  }}
                >
                  Malesuada purus nibh dictumst odio sed elit adipiscing. Turpis
                  malesuada nulla molestie ac gravida magna. Imperdiet tempus,
                  commodo non morbi nisi. Et sit dictum velit facilisi id. Sed
                  augue eget metus non habitant. Donec praesent vel tellus
                  consequat turpis venenatis quis. Curabitur urna arcu et
                  venenatis, aliquet turpis elit risus. Sapien, at vitae
                  molestie purus nec quam fermentum adipiscing. Varius eget nibh
                  mi, ut dui nisi, cursus nunc. Hendrerit faucibus amet vel
                  nisl, integer. Odio sit pretium sed nascetur vitae in aliquam
                  feugiat integer.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: 2,
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "160%",
                    color: "#2C3038",
                  }}
                >
                  Website:{" "}
                  {selectedUniversity.web_pages?.length > 0 ? (
                    <Link to={selectedUniversity.web_pages[0]}>
                      {selectedUniversity.web_pages[0]}
                    </Link>
                  ) : (
                    "Without domain"
                  )}
                </Typography>
                <CountryDetailSection
                  label="Location"
                  value={selectedUniversity.country}
                />
                <CountryDetailSection
                  label="Country’s capital"
                  value={capital}
                />
                <CountryDetailSection label="Currency" value={currency} />
                <CountryDetailSection label="Languages" value={language} />
                <CountryDetailSection label="Population" value={population} />
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default withCountryProvider(withProfileProvider(UserProfile));
