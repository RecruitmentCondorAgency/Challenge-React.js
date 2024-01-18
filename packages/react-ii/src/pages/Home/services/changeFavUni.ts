import { useEffect, useState } from "react"
import UseFetch, { IHttpState } from "../../../hooks/useFetch"
import { University } from '../../../types/university';
import { User } from "../../../types/user";

const useChangeFavUni = () => {
  const {request,state } = UseFetch()
  

  const changeFavUni = (body: User) => {
    request({
      method: 'PUT',
      url:`/users/${body.id}`,
      body
    })
  }


  return { changeFavUni, favReqState:state }

}

export default useChangeFavUni