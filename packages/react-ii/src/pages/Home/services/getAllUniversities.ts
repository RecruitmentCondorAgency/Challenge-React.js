import { useEffect, useState } from "react"
import UseFetch, { IHttpState } from "../../../hooks/useFetch"
import { University } from '../../../types/university';

export type GetUniveristyResponse = Omit<IHttpState,'data'> & {data: University[]}
const useGetAllUniversities = () => {
  const {request,state } = UseFetch()
  const [universities, setuniversities] = useState<GetUniveristyResponse>({
    data:null,
    error:false,
    loading:false
  })

  const getAll = (termino: string ) => {
    request({
      method: 'GET',
      exactUrl: true,
      url:`http://universities.hipolabs.com/search?name=${termino}&limit=100`
    })
  }

    useEffect(() => {
        if(state)
        setuniversities({...state})
    },[state])


  return {getAll, universitiesRes:universities }

}

export default useGetAllUniversities