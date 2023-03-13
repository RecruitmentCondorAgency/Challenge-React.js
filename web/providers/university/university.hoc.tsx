import { FC } from "react";
import { UniversityProvider } from "./university.provider";

export const withUniversityProvider = (Component: FC) => () =>
  (
    <UniversityProvider>
      <Component />
    </UniversityProvider>
  );
