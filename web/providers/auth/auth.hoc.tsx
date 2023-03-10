// no prettier
import { FC, ReactNode } from "react";
import { FCWithChildren } from "../../common/types/general.types";
import { LoggedUserProvider } from "./auth.provider";

export const withAuthProvider =
  (Component: FC | FCWithChildren) => (props: {} | { children?: ReactNode }) =>
    (
      <LoggedUserProvider>
        <Component {...props} />
      </LoggedUserProvider>
    );
