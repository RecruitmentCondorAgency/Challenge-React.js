import { useContext } from "react";
import { UseCountry } from "./types";
import { CountryContext } from "./country.provider";

export const useCountry = (): UseCountry => {
  const [state, dispatch] = useContext(CountryContext);
  return [state, dispatch];
};
