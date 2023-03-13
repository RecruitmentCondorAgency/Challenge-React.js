import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
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
  { revalidateUser: () => void 0, login: () => void 0, logout: () => void 0 },
];

export const AuthContext = createContext<UseAuth>(initialAuthContext);

export const LoggedUserProvider: FCWithChildren = ({ children }) => {
  const [loginErrorState, setLoginErrorState] = useState<string | undefined>(
    undefined
  );
  const { error, data, isLoading, refetch } = useQuery<UserEntity, ErrorQuery>(
    [QueryActions.AUTH_GET_LOGGED],
    () => getUser(localstorageManager.getItem(keys.USER_ID, undefined))
  );

  const {
    data: loginData,
    error: loginError,
    isLoading: loginLoading,
    mutate,
    isSuccess,
  } = useMutation<LoginResponse, ErrorQuery, LoginVariables>(
    [QueryActions.AUTH_LOGIN],
    login
  );

  const loginUser = useCallback(
    (values: LoginVariables) => {
      mutate(values);
    },
    [mutate]
  );

  const logout = useCallback(() => {
    localstorageManager.removeItem(keys.USER_ID);
    window.location.reload();
  }, []);

  useEffect(() => {
    if (isSuccess && !loginData?.[0]?.id) {
      setLoginErrorState("Incorrect credentials.");
    } else if (isSuccess) {
      localstorageManager.setItem(keys.USER_ID, loginData?.[0].id);
      refetch();
      setLoginErrorState(undefined);
    }
  }, [isSuccess]);

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
          loginError: loginError?.response?.data?.message ?? loginErrorState,
        },
        { revalidateUser: () => refetch(), login: loginUser, logout },
      ]}
    >
      {children}
    </AuthContext.Provider>
  );
};
