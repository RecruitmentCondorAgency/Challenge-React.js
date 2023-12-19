import axios from 'axios';

const publicFetch = axios.create({
  baseURL: "http://localhost:3000/"
});

const univFetch = axios.create({
  baseURL: "http://universities.hipolabs.com"
});

const countryFetch = axios.create({
  baseURL: "https://restcountries.com/v3.1/"
});

class PublicAuthService {
  loginApi = async (loginData) => {
    try {
      const userData = await publicFetch.get(`/users?email=${loginData.email}&password=${loginData.password}`);
      return userData;
    } catch (error) {
      console.log("error -->", error);
      return [];
    }
  };

  registerApi = async (registerData) => {
    try {
      const { data } = await publicFetch.post('/users', registerData);
      return data;
    } catch (error) {
      console.log("error -->", error);
      return [];
    }
  };

  universityApi = async (countryName) => {
    try {
      const uniData = await univFetch.get(`/search?country=${countryName}&limit=15&offset=1`);
      return uniData;
    } catch (error) {
      console.log("error -->", error);
      return [];
    }
  };

  universitySearchApi = async (options) => {
    try {
      let url = '/search?limit=500&offset=1&';
      if (options.country) {
        url += `country=${options.country}&`;
      }
      if (options.name) {
        url += `name=${options.name}`;
      }
      const uniData = await univFetch.get(url);
      return uniData;
    } catch (error) {
      console.log("error -->", error);
      return [];
    }
  };

  countryApi = async () => {
    try {
      const countryData = await countryFetch.get(`all?fields=name`);
      return countryData;
    } catch (error) {
      console.log("error -->", error);
      return [];
    }
  };

  countryDetailApi = async (name) => {
    try {
      const countryDetailData = await countryFetch.get(`/name/${name}?fullText=true`);
      return countryDetailData;
    } catch (error) {
      console.log("error -->", error);
      return [];
    }
  };
}

export const publicauthService = new PublicAuthService();
