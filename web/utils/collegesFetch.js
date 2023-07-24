import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const fetchColleges = async () => {
  const response = await axios.get(`${BASE_URL}/colleges`)
  return response.data
}
