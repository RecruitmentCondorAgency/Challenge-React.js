import { FC } from "react";
import { UserProvider } from "./user.provider";

export const withRegisterProvider = (Component: FC) => () =>
  (
    <UserProvider>
      <Component />
    </UserProvider>
  );
