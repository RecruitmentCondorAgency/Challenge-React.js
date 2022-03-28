import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { countries } from "../services"
import { SelectedUniversity } from "../store/user/types"
import abortSignal from "../utils/abortSiganl"
import notifyConfig from "../utils/notifyConfig"

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
      newInfo.currencies = convertObjectToArray(newInfo.currencies)
      newInfo.languages = convertObjectToArray(newInfo.languages)
      setInfo(newInfo)
    })
    .catch((err) => {
      console.error(err)
      toast('An error ocuured while fetching data, please try again', {...notifyConfig, type: 'error'})
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
