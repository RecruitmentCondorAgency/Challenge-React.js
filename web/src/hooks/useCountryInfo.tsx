import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { countries } from "../services"
import { SelectedUniversity } from "../store/user/types"
import abortSignal from "../utils/abortSiganl"

let controller: AbortController

const useCountryInfo = (item: SelectedUniversity): [any, boolean, any] => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)
  useEffect (() => {
    abortSignal(controller)
    setLoading(true)
    controller = new AbortController()
    countries.getCountry(item.alpha_two_code).then((country) => {
      let newInfo = country
      newInfo.currencies = convertObjectToArray(newInfo.currencies)
      newInfo.languages = convertObjectToArray(newInfo.languages)
      setInfo(newInfo)
      setError(null)
    })
    .catch((err) => {
      console.error(err)
      setError(err)
    })
    .finally(() => {
      setLoading(false)
    })
    return () => abortSignal(controller)
  }, [item])

  return [info, loading, error]
}

export default useCountryInfo

const convertObjectToArray = (data: any) => {
  return Object.keys(data).map((key) => ({
    code: key,
    data: data[key]
  }))
}
