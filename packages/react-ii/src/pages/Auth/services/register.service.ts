import UseFetch from "../../../hooks/useFetch"

const useRegister = () => {
  const {request,state } = UseFetch()

  const registerUser = (data) => {
    request({
      method: 'POST',
      url:'/users',
      body: {...data, universities: []}
    })
  }

  return {registerUser, registerResponse:state}

}

export default useRegister