export type CountryEntity = {
  name: {
    common: string;
    official: string;
  };
  currencies: { [x: string]: { name: string; symbol: string } };
  capital: string[];
  languages: { [x: string]: string };
  population: number;
};
