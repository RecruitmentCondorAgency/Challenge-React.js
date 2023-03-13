import { FC } from "react";
import { CountryProvider } from "./country.provider";

export const withCountryProvider = (Component: FC) => () =>
  (
    <CountryProvider>
      <Component />
    </CountryProvider>
  );
