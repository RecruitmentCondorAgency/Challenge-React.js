import { UserEntity } from "../../common/entities";
import { ErrorQuery } from "../../common/types/use-query.types";

export type UseUserState = {
  registerUser: UserEntity | undefined;
  registerUserError: string | undefined;
  registerUserLoading: boolean;
};

export type UseUserDispatch = {
  register: (values: RegisterVariables) => Promise<void>;
};

export type UseUser = [UseUserState, UseUserDispatch];

export type RegisterResponse = UserEntity;

export type RegisterVariables = {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
