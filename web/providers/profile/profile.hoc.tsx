import { FC } from "react";
import { ProfileProvider } from "./profile.provider";

export const withProfileProvider = (Component: FC) => () =>
  (
    <ProfileProvider>
      <Component />
    </ProfileProvider>
  );
