const getLanguage = (setLanguages, country) => {
  const languagesData = country.languages;
  let values = [];
  for (let key in languagesData) {
    values.push(languagesData[key]);
  }
  setLanguages(values);
};
export default getLanguage;
