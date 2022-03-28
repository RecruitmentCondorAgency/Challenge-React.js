import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { universities } from "../services"
import { SelectedUniversity } from "../store/user/types"
import abortSignal from "../utils/abortSiganl"

let controller: AbortController

const useGetDescription = (data: SelectedUniversity): [string, boolean] => {
  const location = useLocation()
  const [description, setDescription] = useState(data.description ?? '')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (!location.pathname.includes('/profile')) {
      setLoading(true)
      controller = new AbortController()
      universities.getUniversityDescription(data.web_pages[0], controller.signal).then((content) => {
        if (content) setDescription(content)
        else setDescription(`${data.name}, ${data.country}`)
      }).finally(() => {
        setLoading(false)
      })
    } 
    return () => abortSignal(controller)
  }, [])

  return [description, loading]
}

export default useGetDescription