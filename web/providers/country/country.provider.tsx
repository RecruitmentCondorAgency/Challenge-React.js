import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import { QueryActions } from "../../common/constants/queries.constant";
import { CountryEntity } from "../../common/entities";
import { FCWithChildren } from "../../common/types/general.types";
import { ErrorQuery } from "../../common/types/use-query.types";
import { getCountryDetails } from "../../network/country.network";
import { UseCountry } from "./types";

const initialCountryContext: UseCountry = [
  {
    country: undefined,
    countryError: undefined,
    countryLoading: false,
  },
  { fetchCountryDetails: (_: string) => void 0 },
];

export const CountryContext = createContext<UseCountry>(initialCountryContext);

export const CountryProvider: FCWithChildren = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const { error, data, isLoading, refetch } = useQuery<
    CountryEntity[],
    ErrorQuery
  >(
    [QueryActions.COUNTRY_GET, selectedCountry],
    () => getCountryDetails(String(selectedCountry)),
    { enabled: false, refetchOnWindowFocus: false }
  );

  const fetchCountryDetails = useCallback(
    (country: string) => {
      setSelectedCountry(country);
    },
    [setSelectedCountry]
  );

  useEffect(() => {
    if (selectedCountry) {
      refetch();
    }
  }, [selectedCountry]);

  return (
    <CountryContext.Provider
      value={[
        {
          country: data?.[0],
          countryError: error?.message,
          countryLoading: isLoading,
        },
        { fetchCountryDetails },
      ]}
    >
      {children}
    </CountryContext.Provider>
  );
};
