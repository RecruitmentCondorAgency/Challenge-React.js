import { useContext } from "react";
import { UseUniversity } from "./types";
import { UniversityContext } from "./university.provider";

export const useUniversity = (): UseUniversity => {
  const [state, dispatch] = useContext(UniversityContext);
  return [state, dispatch];
};
