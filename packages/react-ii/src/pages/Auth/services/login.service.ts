import { useEffect, useState } from "react"
import UseFetch, { IHttpState } from "../../../hooks/useFetch"
import { University } from "../../../types/university"
import { Univeristy } from "../../University/Univeristy"


const useLogin = () => {
  const {request,state } = UseFetch()

  const loginUser = (data) => {
    request({
      method: 'GET',
      url:`/users?email=${data.email}&password=${data.password}`,
      body: data
    })
  }


  return {loginUser, loginResponse:state }

}

export default useLogin