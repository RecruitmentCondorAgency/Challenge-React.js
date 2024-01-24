import UseFetch from "../../../hooks/useFetch"


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