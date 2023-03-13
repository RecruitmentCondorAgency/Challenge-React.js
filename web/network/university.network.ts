import { apiUrls } from "../common/constants/apiUrls.constants";
import { apiManager } from "../common/utils";

export const searchUniversitiesByName = async (name: string) => {
  const { data } = await apiManager.get(
    `${apiUrls.UNIVERSITY_URL}/search?name=${name}`
  );
  return data;
};
