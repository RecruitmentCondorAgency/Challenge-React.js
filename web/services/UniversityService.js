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