import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectUniversities } from "../store/user/selects"
import { University } from "../store/user/types"

const useHasUniversity = (data: University) => {
  const universities = useSelector(selectUniversities)
  const [hasUniversity, setHasUniversity] = useState(false)
  useEffect(() => {
    let result = false
    if (data && universities) {
      result = universities.some(item => item.name === data.name)
    }
    setHasUniversity(result)
  }, [data, universities])

  return hasUniversity
}

export default useHasUniversity