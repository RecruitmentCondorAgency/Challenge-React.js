import axios from 'axios'

axios.defaults.timeout = 1000 * 30

axios.interceptors.request.use(
  config => {
    if (config.headers) {
      (config.headers as any).common['Content-Type'] = 'application/json'
    }
    return config
  },
  error => {
    console.group('[Axios][Interceptor] Request Error')
    if (error.response) {
      console.error(error.response)
    } else {
      console.error(error)
    }
    console.groupEnd()
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  data => {
    return data
  },
  error => {
    console.group('[Axios][Interceptor] Response Error')
    if (error.response) {
      console.error(error.response)
    } else {
      console.error(error)
    }
    console.groupEnd()
    return Promise.reject(error)
  }
)

export default axios
