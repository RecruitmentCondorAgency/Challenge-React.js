const getCurrency = (setCurrency, country) => {
  if (!country.currencies) return;
  const currency = Object.keys(country.currencies);
  setCurrency(currency);
};
export default getCurrency;
