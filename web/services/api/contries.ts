
import { University } from '../../store/user/types'
import axios from '../interceptor'

const base = 'https://restcountries.com/v3.1'


const precAmountDescription = [
  'between 0-0.25mm/hr',
  'between 0.25-1mm/hr',
  'between 1-4mm/hr',
  'between 4-10mm/hr',
  'between 10-16mm/hr',
  'between 16-30mm/hr',
  'between 30-50mm/hr',
  'between 50-75mm/hr',
  'over 75mm/hr'
]

const precTypeDescription: {[key: string]: string} = {
  'snow': 'snowy day',
	'rain': 'rainy day',
	'frzr': 'freezing rainy day',
	'icep': 'freezing rainy and snowy day',
	'none': 'day with normal temperature'
}

const getCountry = async (code: string) => {
  const countryResponse = await axios.get<any>(`${base}/alpha/${code}`, {
    params: {
      fullText: true
    }
  })

  const [lat, lon] = countryResponse.data[0].latlng

  const weatherResponse = await axios.get('http://www.7timer.info/bin/api.pl', {
    params: {
      lat,
      lon,
      output:'json',
      product: 'civil'
    }
  })
  const {dataseries, ...weather} = weatherResponse.data

  return {...countryResponse.data[0], weather: {...weather, ...transformData(dataseries[0])}}
}

const transformData = (data: any) => {
  data.prec_type_description = precTypeDescription[data.prec_type]
  data.prec_amount = precAmountDescription[data.prec_amount as number]
  data.temp2m = `${data.temp2m}°C`
  return data
}

export default {
  getCountry
}