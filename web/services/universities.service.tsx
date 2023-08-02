import axios from "axios";

const universityService = {
  getUniversities: async (param: string) => {
    const { data } = await axios.get(
      `http://universities.hipolabs.com/search?name=${param}`
    );
    return data;
  },
  getUniversityCountry: async (param: string) => {
    const { data } = await axios.get(
      `https://restcountries.com/v3.1/alpha/${param}`
    );
    return data;
  }
};

export { universityService };
