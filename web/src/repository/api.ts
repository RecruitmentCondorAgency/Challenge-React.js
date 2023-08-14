import axios from 'axios';
import { User } from '../types/user';
import { University } from '../types/university';
import { Country } from '../types/country';
import { Weather } from '../types/weather';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

type smallUser = Omit<User, 'universities' | 'id'>;

function registerUser(user: smallUser) {
  const newUser: User = { ...user, universities: [] };
  return api
    .post<typeof newUser>('/users', newUser)
    .then((response) => response.data);
}

function loginUser(user: smallUser) {
  return api.get<User[]>('/users').then((response) => {
    const userRegister = response.data.filter((u) => {
      const sameEmail = u.email === user.email;
      const samePassword = u.password === user.password;
      return sameEmail && samePassword;
    });
    if (userRegister.length === 1) {
      return userRegister[0];
    } else {
      throw Error('bad credentials');
    }
  });
}

function updateUser(user: Partial<User>) {
  const { id, ...userData } = user;
  return api
    .patch<User>(`/users/${id}`, { ...userData })
    .then((response) => response.data);
}

function getUser(id: number) {
  return api.get<User>(`/users/${id}`).then((response) => response.data);
}

function addUniversity(user: Partial<User>, newUniversity: University) {
  const isFavorite = user.universities.some(
    (uni) => uni.name === newUniversity.name
  );
  if (isFavorite) return;
  const newUniversities = [...user.universities, newUniversity];
  return updateUser({ id: user.id, universities: newUniversities });
}

function removeUniversity(user: Partial<User>, university: University) {
  const isFavorite = user.universities.some(
    (uni) => uni.name === university.name
  );
  if (!isFavorite) return;
  const newUniversities = user.universities.filter(
    (uni) => uni.name !== university.name
  );
  return updateUser({ id: user.id, universities: newUniversities });
}

function searchUniversities(search: string, limit?: number) {
  return axios
    .get<University[]>('http://universities.hipolabs.com/search', {
      params: {
        name: search,
        limit,
      },
    })
    .then((response) => response.data);
}

function getCountryInfo(alphaCode: string) {
  return axios
    .get<Country[]>(`https://restcountries.com/v3.1/alpha/${alphaCode}`)
    .then((response) => {
      if (response.data.length !== 1) throw Error('Multiple countries');
      return response.data[0];
    });
}

function getWeatherInfo(lon: number, lat: number) {
  return api
    .get<Weather>('http://www.7timer.info/bin/api.pl', {
      params: {
        lon,
        lat,
        product: 'two',
        output: 'json',
      },
    })
    .then((response) => response.data);
}

export const countryAPI = {
  getCountryInfo,
  getWeatherInfo,
};

export const userAPI = {
  getUser,
  registerUser,
  loginUser,
  addUniversity,
  removeUniversity,
};

export const universityAPI = {
  searchUniversities,
};
