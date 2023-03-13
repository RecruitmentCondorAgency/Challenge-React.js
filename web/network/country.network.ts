import { apiUrls } from "../common/constants/apiUrls.constants";
import { apiManager } from "../common/utils";

export const getCountryDetails = async (countryCode: string) => {
  const { data } = await apiManager.get(
    `${apiUrls.COUNTRY_BASE_URL}/alpha/${countryCode}`
  );
  return data;
};
