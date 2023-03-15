import { useMutation } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { QueryActions } from "../../common/constants/queries.constant";
import { FCWithChildren } from "../../common/types/general.types";
import { ErrorQuery } from "../../common/types/use-query.types";
import { getUserByEmail, register } from "../../network/users.network";
import { RegisterResponse, RegisterVariables, UseUser } from "./types";
const initialUserContext: UseUser = [
  {
    registerUser: undefined,
    registerUserError: undefined,
    registerUserLoading: false,
  },
  { register: async (_) => void 0 },
];

export const UserContext = createContext<UseUser>(initialUserContext);

export const UserProvider: FCWithChildren = ({ children }) => {
  const [createUserError, setcreateUserError] = useState<string | undefined>(
    undefined
  );
  const { data, error, isLoading, mutate, isSuccess } = useMutation<
    RegisterResponse,
    ErrorQuery,
    Omit<RegisterVariables, "confirmPassword">
  >([QueryActions.USER_CREATE], register);

  const registerUser = useCallback(
    async (values: RegisterVariables) => {
      try {
        const response = await getUserByEmail(values.email);
        if (response.length > 0) {
          setcreateUserError("The user email was previous registered.");
          return;
        }

        const { confirmPassword, ...rest } = values;
        mutate({ ...rest, id: uuid() });
      } catch (error) {
        setcreateUserError("Unexpected Error. Please contact administrator");
      }
    },
    [mutate]
  );

  useEffect(() => {
    if (isSuccess) {
      setcreateUserError(undefined);
    }
  }, [isSuccess]);

  return (
    <UserContext.Provider
      value={[
        {
          registerUser: data,
          registerUserError: error?.response?.data?.message ?? createUserError,
          registerUserLoading: isLoading,
        },
        { register: registerUser },
      ]}
    >
      {children}
    </UserContext.Provider>
  );
};
