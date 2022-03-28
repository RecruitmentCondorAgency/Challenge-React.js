import { useEffect, useState } from "react"
import { countries } from "../services"
import { SelectedUniversity } from "../store/user/types"
import abortSignal from "../utils/abortSiganl"

let controller: AbortController

const useCountryInfo = (item: SelectedUniversity): [any, boolean] => {
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState(null)
  useEffect (() => {
    abortSignal(controller)
    setLoading(true)
    controller = new AbortController()
      countries.getCountry(item.alpha_two_code).then((country) => {
      let newInfo = country
      console.log('newInfo', newInfo)
      newInfo.currencies = convertObjectToArray(newInfo.currencies)
      newInfo.languages = convertObjectToArray(newInfo.languages)
      setInfo(newInfo)
    })
    .finally(() => {
      setLoading(false)
    })
    return () => abortSignal(controller)
  }, [item])

  return [info, loading]
}

export default useCountryInfo

const convertObjectToArray = (data: any) => {
  return Object.keys(data).map((key) => ({
    code: key,
    data: data[key]
  }))
}
