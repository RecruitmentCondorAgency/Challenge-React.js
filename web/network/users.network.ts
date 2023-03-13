import { apiUrls } from "../common/constants/apiUrls.constants";
import { UserEntity } from "../common/entities";
import { apiManager } from "../common/utils";
import { LoginVariables } from "../providers/auth/types";
import { RegisterVariables } from "../providers/user/types";

export const getUser = async (userId: string | undefined) => {
  const { data } = await apiManager.get(`${apiUrls.USER_URL}/${userId}`);
  return data;
};
export const getUserByEmail = async (userEmail: string) => {
  const { data } = await apiManager.get(
    `${apiUrls.USER_URL}?email=${userEmail}`
  );
  return data;
};

export const login = async (values: LoginVariables) => {
  const { data } = await apiManager.get(
    `${apiUrls.USER_URL}?email=${values.email}&password=${values.password}&limit=1`
  );
  return data;
};

export const register = async (
  values: Omit<RegisterVariables, "confirmPassword">
) => {
  const { data } = await apiManager.post(`${apiUrls.USER_URL}`, {
    data: { ...values },
  });
  return data;
};
export const updateProfile = async (user: UserEntity) => {
  const { data } = await apiManager.put(`${apiUrls.USER_URL}/${user.id}`, {
    data: { ...user },
  });
  return data;
};
