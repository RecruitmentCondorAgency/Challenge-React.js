import axios from 'axios';
const usersPath = 'http://localhost:3000/users';

export function getUniversityByName(name) {
    return axios.get(`http://universities.hipolabs.com/search?name=${name}`);
}

export function getCountryDetails(country) {
    return axios.get(`https://restcountries.com/v3.1/name/${country}`);
}

export function signupUser({ email, password }) {
    return axios.post(usersPath, { email, password, universities: [] });
}

export function getUser(userId) {
    return axios.get(`${usersPath}/${userId}`);
}

export function getUsers() {
    return axios.get(usersPath);
}

export function addFavoriteUniversity(userId, data) {
    return axios.put(`${usersPath}/${userId}`, data);
}