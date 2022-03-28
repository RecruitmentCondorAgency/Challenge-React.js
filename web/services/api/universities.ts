import { University } from '../../store/user/types'
import axios from '../interceptor'

const base = 'http://universities.hipolabs.com/search'

const getUniversities = (name: string, signal: AbortSignal) => {
  return axios.get<University[]>(base, {
    params: {
      name
    },
    signal
  })
}

const getUniversityDescription = (url: string, signal: AbortSignal) => {
  return new Promise<string | null>(async (resolve) => {
    try {
      const api_key = process.env.REACT_APP_SCRAPPING_KEY
      const response = await axios.get<string>('http://api.scraperapi.com', {
        params: {
          api_key,
          url
        },
        signal
      })
      const parser = new DOMParser();
      const htmlPage = parser.parseFromString(response.data, 'text/html');
      let node: HTMLMetaElement | null = htmlPage.querySelector('meta[name="og:description"]')
      if (!node) {
        node = htmlPage.querySelector('meta[name="description"]')
      }
      resolve(node ? node.content : null)
    } catch (err) {
      console.error(err)
      resolve(null)
    }
  })
}

export default {
  getUniversities,
  getUniversityDescription
}