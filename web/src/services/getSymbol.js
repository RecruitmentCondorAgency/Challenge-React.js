const getSymbol = (setSymbol, country) => {
  for (const currency in country.currencies) {
    if (
      country.currencies.hasOwnProperty(currency) &&
      typeof country.currencies[currency] === "object"
    ) {
      return setSymbol(country.currencies[currency].symbol);
    }
  }
  setSymbol("No se encontró el símbolo");
};
export default getSymbol;
