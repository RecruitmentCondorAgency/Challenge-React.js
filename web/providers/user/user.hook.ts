import { useContext } from "react";
import { UseUser } from "./types";
import { UserContext } from "./user.provider";

export const useUser = (): UseUser => {
  const [state, dispatch] = useContext(UserContext);
  return [state, dispatch];
};
