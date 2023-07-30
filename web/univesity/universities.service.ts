import axios from "axios";

const universityService = {
  getUniversities: async (param: string) => {
    const { data } = await axios.get(
      `http://universities.hipolabs.com/search?name=${param}`
    );
    return data;
  },
};

export { universityService };
