import { apiUrls } from "../common/constants/apiUrls.constants";
import { apiManager } from "../common/utils";
import { LoginVariables } from "../providers/auth/types";

export const getUser = async (userId: number | undefined) => {
  const { data } = await apiManager.get(`${apiUrls.USER_URL}/${userId}`);
  return data;
};

export const login = async (values: LoginVariables) => {
  const { data } = await apiManager.get(
    `${apiUrls.USER_URL}?email=${values.email}&password=${values.password}&limit=1`
  );
  return data;
};
