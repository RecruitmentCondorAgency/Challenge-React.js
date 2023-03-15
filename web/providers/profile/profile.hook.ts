import { useContext } from "react";
import { UseProfile } from "./types";
import { ProfileContext } from "./profile.provider";

export const useProfile = (): UseProfile => {
  const [state, dispatch] = useContext(ProfileContext);
  return [state, dispatch];
};
