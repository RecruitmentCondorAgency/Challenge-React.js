import { useEffect, useState } from "react"
import { universities } from "../services"
import { University } from "../store/user/types"
import abortSiganl from "../utils/abortSiganl"

let controller: AbortController

const useUniversitiesList = (query: string, batchLength = 10) => {
  const [list, setList] = useState<University[]>([])
  const [batch, setBatch] = useState<University[]>([])
  useEffect(() => {
    const name = query.toLowerCase().trim()
    if (name && name.length > 1) {
      abortSiganl(controller)
      controller = new AbortController()
      universities.getUniversities(name, controller.signal).then((response) => {
        const filteredList = removeRepeatedElements(response.data)
        setList(filteredList)
        setBatch(filteredList.slice(0, batchLength))
      })
    } else {
      setList([])
      setBatch([])
    }

    return () => abortSiganl(controller)
  }, [query])

  useEffect(() => {
    if (list.length) {
      setBatch(list.slice(0, batchLength))
    }
  }, [batchLength])
  return [batch, list]
}

export default useUniversitiesList

const removeRepeatedElements = (list: University[]) => {
  return list.filter((item, actualIndex) => {
    return list.findIndex(childItem => childItem.name === item.name) === actualIndex
  })
}
