const axios = require('axios');

export const getUniversities = async function (query) {
    const response = await axios.get('http://universities.hipolabs.com/search?name=' + query)

    return response.data
}

export const postUniversity = async function (userId, university) {
    const response = await axios.post('http://localhost:3000' + '/universities', {
        userId,
        name: university.name,
        country: university.country,
        domains: university.domains,
        web_pages: university.web_pages
    })

    return response.data
}

export const getUserUniversities = async function (userId) {
    const response = await axios.get('http://localhost:3000' + '/universities?userId=' + userId)

    return response.data
}

export const deleteUniversity = async function (id) {
    const response = await axios.delete('http://localhost:3000' + '/universities/' + id)

    return response.data
}