const axios = require('axios');
export const postUser = async function (email, password) {
    const response = await axios.post('http://localhost:3000' + '/users', {
        email,
        password
    })

    return response.data
}

export const getUser = async function (email) {
    const response = await axios.get('http://localhost:3000' + '/users?email=' + email)

    return response.data[0]
}