import Typography from "@mui/material/Typography";
import { FC, ReactNode } from "react";
import { useCountry } from "../../providers/country/country.hook";
import { Skeleton } from "@mui/material";

export const CountryDetailSection: FC<{
  label: string;
  value?: ReactNode;
}> = ({ label, value }) => {
  const [{ countryLoading }] = useCountry();
  return (
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
      {label}: {countryLoading ? <Skeleton variant="text" /> : value}
    </Typography>
  );
};
