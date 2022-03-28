
import { University } from '../../store/user/types'
import axios from '../interceptor'

const base = 'https://restcountries.com/v3.1'

const getCountry = (code: string) => {
  return axios.get<University>(`${base}/alpha/${code}`, {
    params: {
      fullText: true
    }
  })
}

export default {
  getCountry
}