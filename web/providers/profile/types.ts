import { UniversityEntity } from "../../common/entities";
import { ErrorQuery } from "../../common/types/use-query.types";

export type UseProfileState = {
  updateProfileData: boolean;
  updateProfileError: string | undefined;
  updateProfileLoading: boolean;
};

export type UseProfileDispatch = {
  addUniversity: (university: UniversityEntity) => Promise<void>;
  removeUniversity: (university: UniversityEntity) => Promise<void>;
};

export type UseProfile = [UseProfileState, UseProfileDispatch];
