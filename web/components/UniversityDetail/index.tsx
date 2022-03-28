import { useEffect, useState } from "react"
import { countries } from "../../services"
import { SelectedUniversity } from "../../store/user/types"
import abortSignal from "../../utils/abortSiganl"
import Card from "../Card"
import Spinner from "../Spinner"

type Props = {item: SelectedUniversity}

let controller: AbortController

const UniversityDetail = (props: Props) => {
  const {item} = props
  const [loading, setLoading] = useState(false)
  useEffect (() => {
    abortSignal(controller)
    setLoading(true)
    controller = new AbortController()
    Promise.all([
      countries.getCountry(item.alpha_two_code)
    ]).then((response) => {
      console.log('country', response)
    })
    .finally(() => {
      setLoading(false)
    })
    return () => abortSignal(controller)
  }, [item])
  return (
    <div className="detail-container">
      <Card>
          {
            loading ?
            <div className="loader">
              <Spinner></Spinner>
            </div> :
            <>
              <h3>{item.name}</h3>
              <p>
                {item.description}
              </p>
            </>
          }
      </Card>
    </div>
  )
}

export default UniversityDetail