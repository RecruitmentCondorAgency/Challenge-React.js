import { CountryEntity } from "../../common/entities";

export type UseCountryState = {
  country: CountryEntity | undefined;
  countryError: string | undefined;
  countryLoading: boolean;
};

export type UseCountryDispatch = {
  fetchCountryDetails: (countryCode: string) => void;
};

export type UseCountry = [UseCountryState, UseCountryDispatch];

export type RegisterResponse = CountryEntity;
