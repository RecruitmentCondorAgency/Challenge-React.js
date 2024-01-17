import { useEffect, useState } from "react"
import UseFetch, { IHttpState } from "../../../hooks/useFetch"
import { University } from '../../../types/university';

export type GetUniveristyResponse = Omit<IHttpState,'data'> & {data: University[]}
const useSearchUni = () => {
  const {request,state } = UseFetch()
  const [universities, setuniversities] = useState<GetUniveristyResponse>({
    data:null,
    error:false,
    loading:false
  })

  const searchUni = (keyword: string) => {
    request({
      method: 'GET',
      exactUrl: true,
      url:`http://universities.hipolabs.com/search?name=${keyword}`
    })
  }

  useEffect(() => {
    if(state)
    setuniversities({...state})
  },[state])


  return {searchUni, serachResponse:universities }

}

export default useSearchUni