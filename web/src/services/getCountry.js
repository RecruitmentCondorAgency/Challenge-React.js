import axios from "axios";

const getCountry = (setCountry, selectUniversity) => {
  axios
    .get(
      `https://restcountries.com/v3.1/name/${selectUniversity.country}?fullText=true`
    )
    .then((res) => setCountry(res.data[0]));
};
export default getCountry;
