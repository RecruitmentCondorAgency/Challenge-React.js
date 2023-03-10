import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { keys } from "../../common/constants/keys.constants";
import { QueryActions } from "../../common/constants/queries.constant";
import { UserEntity } from "../../common/entities";
import { FCWithChildren } from "../../common/types/general.types";
import { ErrorQuery } from "../../common/types/use-query.types";
import { localstorageManager } from "../../common/utils";
import { getUser, login } from "../../network/users.network";
import { LoginResponse, LoginVariables, UseAuth } from "./types";

const initialAuthContext: UseAuth = [
  {
    loggedUserLoading: false,
    loggedUserError: null,
    loggedUser: undefined,
    authenticated: false,

    loginData: undefined,
    loginError: undefined,
    loginLoading: false,
  },
  { revalidateUser: () => void 0, login: () => void 0 },
];

export const AuthContext = createContext<UseAuth>(initialAuthContext);

export const LoggedUserProvider: FCWithChildren = ({ children }) => {
  const { error, data, isLoading, refetch } = useQuery<UserEntity, ErrorQuery>(
    [QueryActions.AUTH_GET_LOGGED],
    () => getUser(localstorageManager.getItem(keys.USER_ID, 0))
  );

  const {
    data: loginData,
    error: loginError,
    isLoading: loginLoading,
    mutate,
  } = useMutation<LoginResponse, ErrorQuery, LoginVariables>(
    [QueryActions.AUTH_LOGIN],
    login
  );

  const loginUser = (values: LoginVariables) => {
    mutate(values);
  };

  return (
    <AuthContext.Provider
      value={[
        {
          loggedUser: data as UserEntity,
          loggedUserError: error,
          loggedUserLoading: isLoading,
          authenticated: Boolean(data?.id),
          loginData,
          loginLoading,
          loginError: loginError?.response?.data?.message,
        },
        { revalidateUser: () => refetch(), login: loginUser },
      ]}
    >
      {children}
    </AuthContext.Provider>
  );
};
