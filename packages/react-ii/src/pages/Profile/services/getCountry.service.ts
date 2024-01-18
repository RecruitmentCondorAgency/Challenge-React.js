import { useEffect, useState } from "react"
import UseFetch, { IHttpState } from "../../../hooks/useFetch"
import { Country } from "../../../types/country"

export type CountryResponse = Omit<IHttpState,'data'> & {data: Country[]}


const useGetCountryByCode = () => {
  const {request,state } = UseFetch()
  const [country, setResponse] = useState<CountryResponse>({
    data:null,
    error:false,
    loading:false
  })

  const getContry = (code:string) => {
    request({
      method: 'GET',
      exactUrl: true,
      url:`https://restcountries.com/v3.1/alpha/${code}`
    })
  }

  useEffect(() => {
    if(state)
    setResponse({...state})
  },[state])


  return {getContry, countryResponse:country }

}

export default useGetCountryByCode