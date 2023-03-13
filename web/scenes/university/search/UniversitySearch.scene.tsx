import { Search } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { FC, useEffect, useState } from "react";
import { Layout } from "../../../components/Layout/Layout";
import { UniversityCard } from "../../../components/UniversityCard/UniversityCard";
import { withProfileProvider } from "../../../providers/profile/profile.hoc";
import { useProfile } from "../../../providers/profile/profile.hook";
import { withUniversityProvider } from "../../../providers/university/university.hoc";
import { useUniversity } from "../../../providers/university/university.hook";
import { createSearchParams, useNavigate } from "react-router-dom";
import { paths } from "../../../common/constants/paths.constants";

const UniversitySearch: FC = () => {
  const [{ universityName, universities }, { setUniversityName }] =
    useUniversity();
  const [{ updateProfileLoading }] = useProfile();
  const [options, setOptions] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [showUniversities, setShowUniversities] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setOptions(universities.map((x) => x.name));
  }, [universities]);

  useEffect(() => {
    if (universityName) {
      setSearchValue(universityName);
    }
  }, []);
  return (
    <Layout alignItems="flex-start">
      <Grid container spacing={4}>
        <Grid item spacing={4} xs={12}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Autocomplete
              disabled={updateProfileLoading}
              loading={updateProfileLoading}
              sx={{ flexGrow: 1, backgroundColor: "white" }}
              getOptionLabel={(option) => option}
              filterOptions={(x) => x}
              options={options}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={universityName}
              inputValue={searchValue ?? undefined}
              noOptionsText="No Options"
              onChange={(_: any, newValue: string | null) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setSearchValue(newValue);
                setShowUniversities(true);
              }}
              onInputChange={(_, newInputValue) => {
                setUniversityName(newInputValue);
                setShowUniversities(false);
              }}
              renderInput={(params) => (
                <TextField {...params} label="University name" fullWidth />
              )}
            />
            <Button
              variant="contained"
              sx={{ width: "76px", height: "58px" }}
              onClick={() => {
                setShowUniversities(true);
              }}
              disabled={updateProfileLoading}
            >
              <Search />
            </Button>
          </Box>
        </Grid>
        {showUniversities && (
          <Grid item container spacing={2} xs={12}>
            {universities.map((university) => (
              <UniversityCard
                university={university}
                key={university.name}
                onClickDetail={() => {
                  navigate({
                    pathname: paths.USER.PROFILE,
                    search: `?${createSearchParams({
                      selected: university.name,
                    })}`,
                  });
                }}
                hideDetail
              />
            ))}
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default withProfileProvider(withUniversityProvider(UniversitySearch));
