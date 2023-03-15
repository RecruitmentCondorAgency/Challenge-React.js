import { UniversityEntity, UserEntity } from "../../common/entities";
import { ErrorQuery } from "../../common/types/use-query.types";

export type UseUniversityState = {
  universityName: string;
  universities: UniversityEntity[];
  universitiesLoading: boolean;
  universitiesError: ErrorQuery | null;
};

export type UseUniversityDispatch = {
  setUniversityName: (name: string) => void;
};

export type UseUniversity = [UseUniversityState, UseUniversityDispatch];
